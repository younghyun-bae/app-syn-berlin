import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

interface User {
  uid: string;
  displayName: string;
  email: string;
  jobTitle: string;
  interests: string[];
  aboutMe: string;
  location: string;
  mainField: string;
  languages: string;
  portfolio: string;
  proudWork: string;
  profilePic?: string;
}

interface UsersState {
  users: User[];
}

type Action =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'REMOVE_USER'; payload: string };

const initialState: UsersState = {
  users: [],
};

const usersReducer = (state: UsersState, action: Action): UsersState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.uid === action.payload.uid ? action.payload : user
        ),
      };
    case 'REMOVE_USER':
      return { ...state, users: state.users.filter((user) => user.uid !== action.payload) };
    default:
      return state;
  }
};

const UsersContext = createContext<{
  state: UsersState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { state: authState } = useAuth();
  const { user } = authState;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const users: User[] = snapshot.docs
          .map((doc) => ({
            ...doc.data(),
            uid: doc.id,
          }))
          .filter((u) => u.uid !== user?.uid) as User[];
        dispatch({ type: 'SET_USERS', payload: users });
      },
      (error) => console.error(error)
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
