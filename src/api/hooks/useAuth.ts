import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    };

    loadUser();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log(JSON.stringify(user, null, 2));
        setUser(currentUser);
        await AsyncStorage.setItem("@user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        await AsyncStorage.removeItem("@user");
        console.log("No user is signed in")
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return user;
};
