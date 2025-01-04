import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { db } from '../../api/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useRouter, Stack } from 'expo-router';
import PostItem from './PostItem';
import CreateBtn from './CreateBtn';

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  author: string;
  createdAt: any;
  replies: number;
  likedByUser?: boolean;
}

interface ThreadScreenProps {
  initialNumToRender?: number;
}


export default function ThreadScreen({ initialNumToRender = 100 }: ThreadScreenProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const postSnapshot = await getDocs(postsCollection);
        const postList = postSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
  
        console.log('Fetched posts:', postList.length);
  
        postList.forEach(post => {
          if (post.createdAt?.seconds) {
            post.createdAt = new Date(post.createdAt.seconds * 1000);
          }
        });
  
        postList.sort((a, b) => b.createdAt - a.createdAt);
  
        setPosts(postList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);

  const handleLike = async (postId: string, currentLikes: number, likedByUser: boolean) => {
    const postRef = doc(db, 'posts', postId);
    const newLikes = likedByUser ? currentLikes - 1 : currentLikes + 1;
    await updateDoc(postRef, { likes: newLikes });

    setPosts(posts.map(post => post.id === postId ? { ...post, likes: newLikes, likedByUser: !likedByUser } : post));
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Threads', headerBackTitleVisible: false }} />
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <PostItem 
            post={item} 
            onLike={handleLike} 
            formatDate={formatDate} 
            index={index} 
            testID={`post-item-${index}`}
          />
        )}
        keyExtractor={(item) => item.id}
        testID="post-list"
        initialNumToRender={initialNumToRender}
      />
      <CreateBtn testID="create-btn" />
    </>
  );
}
