import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, View, Text, Modal } from 'react-native';
import { db } from '../../api/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Stack } from 'expo-router';
import PostItem from './PostItem';
import CreateBtn from './CreateBtn';
import LoadingSpinner from '../LoadingSpinner';
import PostScreen from './post/PostScreen';

import { Post } from 'src/types/postTypes';

export interface ThreadScreenProps {
  initialNumToRender?: number;
}

const POST_ITEM_HEIGHT = 100;

const ThreadScreen: React.FC<ThreadScreenProps> = ({ initialNumToRender = 100 }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const postsCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      postList.forEach(post => {
        if (post.createdAt?.seconds) {
          post.createdAt = new Date(post.createdAt.seconds * 1000);
        }
      });

      postList.sort((a, b) => b.createdAt - a.createdAt);

      setPosts(postList);
    } catch (error) {
      setError("Error fetching posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  const getItemLayout = (data: any, index: number) => ({
    length: POST_ITEM_HEIGHT,
    offset: POST_ITEM_HEIGHT * index,
    index,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts().finally(() => setRefreshing(false));
  }, [fetchPosts]);

  const loadMorePosts = () => {
    // Implement logic to fetch more posts and append to the existing list
    // This is a placeholder for infinite scroll logic
  };

  const handleModalClose = () => {
    setModalVisible(false);
    fetchPosts();
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Threads', headerBackTitleVisible: false }} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <View>
          <Text>{error}</Text>
        </View>
      ) : (
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
          getItemLayout={getItemLayout}
          windowSize={5}
          maxToRenderPerBatch={20}
          initialNumToRender={initialNumToRender}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          testID="post-list"
        />
      )}
      <CreateBtn onPress={() => setModalVisible(true)} testID="create-btn" />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <PostScreen onClose={handleModalClose} />
        </View>
      </Modal>
    </>
  );
}

export default ThreadScreen;