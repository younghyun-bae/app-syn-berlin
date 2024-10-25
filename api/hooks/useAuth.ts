import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'expo-router';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push('../../app/(tabs)');
      } else {
        router.push('../../app/login.tsx');
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};
