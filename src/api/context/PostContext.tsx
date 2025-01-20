import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export interface Post {
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const postsCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCollection);

      const postList = await Promise.all(
        postSnapshot.docs.map(async (doc) => {
          const postData = {
            id: doc.id,
            ...doc.data(),
          } as Post;

          const commentsCollection = collection(db, 'comments');
          const commentQuery = query(commentsCollection, where('postId', '==', doc.id));
          const commentSnapshot = await getDocs(commentQuery);

          postData.replies = commentSnapshot.size;
          if (postData.createdAt?.seconds) {
            postData.createdAt = new Date(postData.createdAt.seconds * 1000);
          }

          return postData;
        })
      );

      postList.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(postList);
    } catch (err) {
      setError('Error fetching posts');
      console.error(err);
    } finally {
      setLoading(false);
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

      const commentsCollection = collection(db, 'comments');
      const commentQuery = query(commentsCollection, where('postId', '==', id));
      const commentSnapshot = await getDocs(commentQuery);

      postData.replies = commentSnapshot.size;
      if (postData.createdAt?.seconds) {
        postData.createdAt = new Date(postData.createdAt.seconds * 1000);
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

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? { ...post, ...updatedData } : post))
      );
    } catch (err) {
      console.error('Error updating post:', err);
      throw new Error('Failed to update post');
    }
  }, []);

  const deletePost = useCallback(async (id: string) => {
    try {
      const postRef = doc(db, 'posts', id);
      await deleteDoc(postRef);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      throw new Error('Failed to delete post');
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostContext.Provider value={{ posts, loading, error, fetchPosts, fetchPostById, updatePost, deletePost }}>
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
