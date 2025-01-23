import React, { createContext, useCallback, useReducer, useContext, ReactNode, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  jobTitle?: string;
  createdAt: any;
  likes: number;
  replies: number;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  jobTitle?: string;
  createdAt: any;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

interface PostCommentState {
  posts: Post[];
  comments: Comment[];
}

const initialState: PostCommentState = {
  posts: [],
  comments: [],
};

type Action =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_COMMENTS'; payload: Comment[] };
  

const postCommentReducer = (state: PostCommentState, action: Action): PostCommentState => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};

const PostCommentContext = createContext<{
  state: PostCommentState;
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
} | undefined>(undefined);

export const PostCommentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(postCommentReducer, initialState);
  const { state: authState } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      const postsCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      postList.forEach(post => {
        if (post.createdAt?.seconds) {
          post.createdAt = new Date(post.createdAt.seconds * 1000);
        }
      });

      postList.sort((a, b) => b.createdAt - a.createdAt);

      dispatch({ type: 'SET_POSTS', payload: postList });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchComments = async (postId: string) => {
    try {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('postId', '==', postId));
      const commentSnapshot = await getDocs(q);
      const commentList = commentSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          content: data.content || 'No Content',
          author: data.author || 'Anonymous',
          authorId: data.authorId || '',
          jobTitle: data.jobTitle || 'N/A',
          createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date(),
          isAuthor: data.authorId === authState.user?.uid,
          onEdit: () => console.log(`Edit comment: ${doc.id}`),
          onDelete: () => console.log(`Delete comment: ${doc.id}`),
        };
      }) as Comment[];


      commentList.forEach(post => {
        if (post.createdAt?.seconds) {
          post.createdAt = new Date(post.createdAt.seconds * 1000);
        }
      });

      commentList.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      dispatch({ type: 'SET_COMMENTS', payload: commentList });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <PostCommentContext.Provider value={{ state, fetchPosts, fetchComments }}>
      {children}
    </PostCommentContext.Provider>
  );
};

export const usePostComment = () => {
  const context = useContext(PostCommentContext);
  if (!context) {
    throw new Error('usePostComment must be used within a PostCommentProvider');
  }
  return context;
};