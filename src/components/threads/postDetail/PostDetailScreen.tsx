import React, { useEffect, useState } from 'react';
import { db } from '../../../api/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, Stack } from 'expo-router';
import styled from 'styled-components/native';
import PostDetail from './PostDetail';
import CommentList from './CommentList';
import CommentInputForm from './CommentInputForm';

interface Comment {
  id: string;
  content: string;
  createdAt: any;
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
      ...doc.data(),
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
    if (!newComment.trim()) return;

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
      <Container>
        {post && <PostDetail title={post.title} content={post.content} />}
        <CommentList comments={comments} />
        <CommentInputForm value={newComment} onChangeText={setNewComment} onSubmit={handleAddComment} />
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f7f7f7;
  padding: 20px;
`;
