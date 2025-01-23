import React from 'react';
import { CommentProvider } from 'src/api/context/CommentContext';
import { PostProvider } from 'src/api/context/PostContext';
import PostDetailScreen from 'src/components/threads/postDetail/PostDetailScreen';

export default function postDetail() {
  return (
    <CommentProvider>
      <PostProvider>   
        <PostDetailScreen />
      </PostProvider>
    </CommentProvider>
  );
}
