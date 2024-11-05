import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../src/api/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function PostScreen() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async () => {
    const postsRef = collection(db, 'posts');
    const newPost = await addDoc(postsRef, {
      title,
      content,
      likes: 0,
      createdAt: serverTimestamp(),
    });
    setTitle('');
    setContent('');
    console.log('New post is added', newPost.id);
    router.back();
    return newPost.id;
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Contents"
        value={content}
        onChangeText={setContent}
        style={{ borderWidth: 1, padding: 8, height: 100 }}
        multiline
      />
      <Button title="Add more post" onPress={handleSubmit} />
    </View>
  );
}
