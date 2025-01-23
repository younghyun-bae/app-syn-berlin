import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { useAuth } from 'src/api/context/AuthContext';
import { useProfile } from 'src/api/context/ProfileContext';

interface Comment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  jobTitle?: string;
  createdAt: any;
  postId: string;
  likes: number;
}

interface CommentState {
  list: Comment[];
  loading: boolean;
  error: string | null;
}

type CommentAction =
  | { type: 'LOAD_COMMENTS_START' }
  | { type: 'LOAD_COMMENTS_SUCCESS'; payload: Comment[] }
  | { type: 'LOAD_COMMENTS_FAILURE'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'DELETE_COMMENT'; payload: string }
  | { type: 'UPDATE_COMMENT'; payload: { id: string; content: string } };

const initialState: CommentState = {
  list: [],
  loading: false,
  error: null,
};

const { state: authState } = useAuth();
const { user } = authState;
  const { profile } = useProfile().state;

const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case 'LOAD_COMMENTS_START':
      return { ...state, loading: true, error: null };
    case 'LOAD_COMMENTS_SUCCESS':
      return { ...state, list: action.payload, loading: false };
    case 'LOAD_COMMENTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_COMMENT':
      return { ...state, list: [action.payload, ...state.list] };
    case 'DELETE_COMMENT':
      return { ...state, list: state.list.filter((comment) => comment.id !== action.payload) };
    case 'UPDATE_COMMENT':
      return {
        ...state,
        list: state.list.map((comment) =>
          comment.id === action.payload.id ? { ...comment, content: action.payload.content } : comment
        ),
      };
    default:
      return state;
  }
};

interface CommentContextProps {
  state: CommentState;
  loadComments: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string, author: string, authorId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  updateComment: (commentId: string, updatedContent: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const loadComments = useCallback(async (postId: string) => {
    dispatch({ type: 'LOAD_COMMENTS_START' });

    try {
      const q = query(collection(db, 'comments'), where('postId', '==', postId));
      const querySnapshot = await getDocs(q);

      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];

      dispatch({ type: 'LOAD_COMMENTS_SUCCESS', payload: fetchedComments });
    } catch (error) {
      dispatch({ type: 'LOAD_COMMENTS_FAILURE', payload: error.message });
    }
  }, []);

  const addComment = useCallback(
    async (postId: string, content: string) => {
      if (user && profile) {
        const commentRef = collection(db, 'comments');
        const newComment = {
          authorId: user.uid,
          author: user.displayName || 'Unknown',
          jobTitle: profile.jobTitle || 'Undefined',
          postId,
          content,
          createdAt: serverTimestamp(),
          likes: 0,
        };
  
        try {
          const docRef = await addDoc(commentRef, newComment);
          dispatch({ type: 'ADD_COMMENT', payload: { id: docRef.id, ...newComment } as Comment });
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      }
    },
    []
  );

  const deleteComment = useCallback(async (commentId: string) => {
    try {
      const commentDoc = doc(db, 'comments', commentId);
      await deleteDoc(commentDoc);
      dispatch({ type: 'DELETE_COMMENT', payload: commentId });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }, []);

  const updateComment = useCallback(async (commentId: string, updatedContent: string) => {
    try {
      const commentDoc = doc(db, 'comments', commentId);
      await updateDoc(commentDoc, { content: updatedContent });
      dispatch({ type: 'UPDATE_COMMENT', payload: { id: commentId, content: updatedContent } });
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  }, []);

  return (
    <CommentContext.Provider
      value={{
        state,
        loadComments,
        addComment,
        deleteComment,
        updateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = (): CommentContextProps => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};
