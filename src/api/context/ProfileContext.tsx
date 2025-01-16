import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

interface ProfileState {
  profile: any | null;
}

const initialState: ProfileState = {
  profile: null,
};

type Action = { type: 'SET_PROFILE'; payload: any | null };

const profileReducer = (state: ProfileState, action: Action): ProfileState => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

const ProfileContext = createContext<{
  state: ProfileState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { state: authState } = useAuth();

  useEffect(() => {
    if (authState.user) {
      const userRef = doc(db, 'users', authState.user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          dispatch({ type: 'SET_PROFILE', payload: docSnap.data() });
        }
      });

      return () => unsubscribe();
    }
  }, [authState.user]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};