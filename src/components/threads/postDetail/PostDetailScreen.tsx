import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { db } from 'src/api/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { usePostComment } from 'src/api/context/ThreadContext';
import { useAuth } from 'src/api/context/AuthContext';
import { useProfile } from 'src/api/context/ProfileContext';

import { useLocalSearchParams, Stack } from 'expo-router';
import styled from 'styled-components/native';
import PostDetail from './PostDetail';
import CommentList from './CommentList';
import CommentInputForm from './CommentInputForm';

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams();
  const { state, fetchComments } = usePostComment();
  const [newComment, setNewComment] = useState('');

  const { state: authState } = useAuth();
  const { user } = authState;
  const { state: profileState } = useProfile();

  useEffect(() => {
    fetchComments(postId as string);
  }, [postId]);

  const post = state.posts.find(p => p.id === postId);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert("It's empty", "Please enter your response.");
      return;
    }

    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    if (!profileState.profile) {
      console.log('Profile is not loaded');
      return;
    }

    try {
      console.log('Adding comment for user:', user.uid);
      console.log('With profile:', profileState.profile);

      const commentsRef = collection(db, 'comments');
      await addDoc(commentsRef, {
        authorId: user.uid,
        author: user.displayName || 'Unknown',
        jobTitle: profileState.profile.jobTitle || 'Undefined',
        postId,
        content: newComment,
        createdAt: serverTimestamp(),
      });

      setNewComment('');
      fetchComments(postId as string);
      console.log('New comment is added');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = (commentId: string) => {
    console.log(`Edit comment with ID: ${commentId}`);
  };

  const handleDeleteComment = async (commentId: string) => {
    console.log(`Delete comment with ID: ${commentId}`);
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
        {post && <PostDetail 
          title={post.title} 
          author={post.author}
          jobTitle={post.jobTitle}
          content={post.content}
          createdAt={post.createdAt} 
        />}
        <CommentList comments={state.comments} />
        <CommentInputForm 
          value={newComment} 
          onChangeText={setNewComment} 
          onSubmit={handleAddComment} 
        />
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f7f7f7;
  padding: 0 0 20px 0;
`;