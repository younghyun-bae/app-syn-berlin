import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

interface ProfileState {
  profile: Profile | null;
}

interface Profile {
  photoURL?: string;
  email?: string;
  displayName?: string;
  location?: string;
  jobTitle?: string;
  mainField?: string;
  aboutMe?: string;
  interests?: string[];
  proudWork?: string;
  portfolio?: string;
  languages?: string;
}

const initialState: ProfileState = {
  profile: null,
};

type Action = 
  | { type: 'SET_PROFILE'; payload: Profile | null }
  | { type: 'UPDATE_PROFILE'; payload: Partial<Profile> };

const profileReducer = (state: ProfileState, action: Action): ProfileState => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };
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
  const { user } = authState; 

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          dispatch({ type: 'SET_PROFILE', payload: docSnap.data() as Profile });
        } else {
          console.warn("No profile found for user:", user?.uid);
        }
      }, (error) => {
        console.error("Error fetching profile:", error);
      });

      return () => unsubscribe();
    }
  }, [user]);

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