import React from 'react';
import { PostProvider } from 'src/api/context/PostContext';
import PostDetailScreen from 'src/components/threads/postDetail/PostDetailScreen';

export default function postDetail() {
  return (
    <PostProvider>
      <PostDetailScreen />
    </PostProvider>
  );
}
