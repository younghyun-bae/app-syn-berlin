import React, { useEffect, useState } from 'react';
import { db } from 'src/api/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Alert, Text } from 'react-native';

import { useAuth } from 'src/api/context/AuthContext';
import { useProfile } from 'src/api/context/ProfileContext';
import { usePosts } from 'src/api/context/PostContext';

import { useLocalSearchParams, Stack } from 'expo-router';
import styled from 'styled-components/native';
import PostDetail from './PostDetail';
import CommentList from './CommentList';
import CommentInputForm from './CommentInputForm';

export default function PostDetailScreen() {
  const { state: authState } = useAuth();
  const { user } = authState;
  const { posts, deletePost, updatePost, fetchPostById } = usePosts();
  const { profile } = useProfile().state;

  const { postId } = useLocalSearchParams();
  const post = posts.find((p) => p.id === postId);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post?.content || '');

  useEffect(() => {
    if (postId) {
      fetchPostById(postId as string);
    }
  }, [postId, fetchPostById]);

  if (!post) return <Text>No post found</Text>;

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert("It's empty", "Please enter your response.");
      return;
    }

    if (!user) {
      throw new Error('User must be logged in to leave a comment');
    }

    if (user && profile) {
      try {
        console.log('Adding comment for user:', user.uid);
        console.log('With profile:', profile);
        const commentsRef = collection(db, 'comments');
        await addDoc(commentsRef, {
          authorId: user.uid,
          author: user.displayName || 'Unknown',
          jobTitle: profile.jobTitle || 'Undefined',
          postId,
          content: newComment,
          createdAt: serverTimestamp(),
          // likes: 0,
        });
  
        setNewComment('');
        await fetchPostById(postId as string);
        console.log('New comment is added');
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };


  const handleEditPost = async () => {
    if (!editedContent.trim()) {
      Alert.alert("It's empty", 'Please enter valid content.');
      return;
    }

    try {
      await updatePost(post.id, { content: editedContent });
      setIsEditing(false);
      Alert.alert('Success', 'Post updated successfully.');
    } catch (error) {
      console.error('Error editing post:', error);
      Alert.alert('Error', 'Failed to edit the post.');
    }
  };

  const handleDeletePost = async () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost(post.id);
            Alert.alert('Success', 'Post deleted successfully.');
          } catch (error) {
            console.error('Error deleting post:', error);
            Alert.alert('Error', 'Failed to delete the post.');
          }
        },
      },
    ]);
  };

  const handleEditComment = async (commentId: string) => {
    console.log(`Edit comment with ID: ${commentId}`);
  };

  const handleDeleteComment = async (commentId: string) => {
    console.log(`Delete comment with ID: ${commentId}`);

  };

  const isAuthor = user?.uid === post.authorId;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Detail',
          headerBackTitle: 'List',
        }}
      />
      <Container>
        {post ? (
            <PostDetail 
              title={post.title} 
              author={post.author}
              jobTitle={post.jobTitle}
              isAuthor={isAuthor}
              content={isEditing ? editedContent : post.content}
              createdAt={post.createdAt}
              isEditing={isAuthor ? isEditing : false}
              onEdit={() => isAuthor && setIsEditing(true)}
              onSave={handleEditPost}
              onCancel={() => {
                setIsEditing(false);
                setEditedContent(post.content);
              }}
              onDelete={isAuthor ? handleDeletePost : undefined} 
              onContentChange={setEditedContent}
            />
          ) : (
            <Text>No post found</Text>
          )}
        <CommentList comments={post.comments || []} />
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