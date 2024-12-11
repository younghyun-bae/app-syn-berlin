import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { db } from '../../src/api/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useRouter, Stack } from 'expo-router';

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
}

export default function ThreadScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: string, currentLikes: number) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { likes: currentLikes + 1 });
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: currentLikes + 1 } : post));
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <TouchableOpacity onPress={() => router.push(`/detail/postDetail?postId=${item.id}`)}>
        <Text style={{ fontSize: 18 }}>{item.title}</Text>
        <Text numberOfLines={2}>{item.content}</Text>
      </TouchableOpacity>
      <Button title={`❤️ ${item.likes}`} onPress={() => handleLike(item.id, item.likes)} />
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ 
        headerTitle: 'Threads',
        headerBackTitleVisible: false,
        }}
      />
      <View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Button title="Create a post" onPress={() => router.push('/detail/post')} />
      </View>
    </>

  );
}