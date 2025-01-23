import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where, Timestamp } from 'firebase/firestore';

export interface Comment {
  id: string;
  content: string;
  author: string;
  jobTitle?: string;
  authorId: string;
  createdAt: Date;
  likes: number;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  jobTitle?: string;
  createdAt: Date;
  likes: number;
  replies: number;
  comments: Comment[];
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

interface State {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Post[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'UPDATE_POST'; payload: { id: string; updatedData: Partial<Post> } }
  | { type: 'DELETE_POST'; payload: string };

const initialState: State = {
  posts: [],
  loading: true,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, posts: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? { ...post, ...action.payload.updatedData } : post
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

interface PostContextProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<Post | null>;
  updatePost: (id: string, updatedData: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextProps | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCommentsForPost = async (postId: string): Promise<Comment[]> => {
    const commentsCollection = collection(db, 'comments');
    const commentQuery = query(commentsCollection, where('postId', '==', postId));
    const commentSnapshot = await getDocs(commentQuery);

    return commentSnapshot.docs.map(commentDoc => {
      const commentData = commentDoc.data();
      return {
        id: commentDoc.id,
        content: commentData.content || '',
        author: commentData.author || '',
        authorId: commentData.authorId || '',
        jobTitle: commentData.jobTitle || '',
        createdAt: commentData.createdAt ? new Date(commentData.createdAt.seconds * 1000) : new Date(),
        likes: commentData.likes || 0,
        isAuthor: false,
        onEdit: () => {},
        onDelete: () => {},
      } as Comment;
    }).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  };

  const fetchPosts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const postsCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCollection);

      const postList = await Promise.all(
        postSnapshot.docs.map(async (doc) => {
          const postData = {
            id: doc.id,
            ...doc.data(),
          } as Post;

          postData.comments = await fetchCommentsForPost(doc.id);
          postData.replies = postData.comments.length;

          if (postData.createdAt instanceof Timestamp) {
            postData.createdAt = postData.createdAt.toDate();
          }

          return postData;
        })
      );

      postList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      dispatch({ type: 'FETCH_SUCCESS', payload: postList });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Error fetching posts' });
      console.error(err);
    }
  }, []);

  const fetchPostById = useCallback(async (id: string): Promise<Post | null> => {
    try {
      const postRef = doc(db, 'posts', id);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        return null;
      }

      const postData = {
        id: postDoc.id,
        ...postDoc.data(),
      } as Post;

      postData.comments = await fetchCommentsForPost(id);
      postData.replies = postData.comments.length;

      if (postData.createdAt instanceof Timestamp) {
        postData.createdAt = postData.createdAt.toDate();
      }

      return postData;
    } catch (err) {
      console.error('Error fetching post by ID:', err);
      return null;
    }
  }, []);

  const updatePost = useCallback(async (id: string, updatedData: Partial<Post>) => {
    try {
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, updatedData);

      dispatch({ type: 'UPDATE_POST', payload: { id, updatedData } });
    } catch (err) {
      console.error('Error updating post:', err);
      throw new Error('Failed to update post');
    }
  }, []);

  const deletePost = useCallback(async (id: string) => {
    try {
      const postRef = doc(db, 'posts', id);
      await deleteDoc(postRef);

      dispatch({ type: 'DELETE_POST', payload: id });
    } catch (err) {
      console.error('Error deleting post:', err);
      throw new Error('Failed to delete post');
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostContext.Provider value={{ ...state, fetchPosts, fetchPostById, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = (): PostContextProps => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};