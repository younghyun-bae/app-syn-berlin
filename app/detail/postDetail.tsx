import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { db } from '../../src/api/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, Stack } from 'expo-router';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
}

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where('postId', '==', postId));
    const commentSnapshot = await getDocs(q);
    const commentList = commentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Comment[];
    setComments(commentList);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, 'posts', postId as string);
      const postSnapshot = await getDoc(postDoc);
      setPost(postSnapshot.data());
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    const commentsRef = collection(db, 'comments');
    await addDoc(commentsRef, {
      postId,
      content: newComment,
      createdAt: serverTimestamp(),
    });
    setNewComment('');
    fetchComments();
    console.log('New comment is added');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Detail',
          headerBackTitle: 'List',
        }}
      />
      <View>
        {post && (
          <View>
            <Text style={{ fontSize: 22 }}>{post.title}</Text>
            <Text>{post.content}</Text>
          </View>
        )}
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={{ padding: 5 }}>
            <Text>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        placeholder="Leave a comment"
        value={newComment}
        onChangeText={setNewComment}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button title="Add a comment" onPress={handleAddComment} />
    </View>
    </>

  );
}