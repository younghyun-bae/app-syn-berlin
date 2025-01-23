import React from 'react';
import ThreadScreen from '../../src/components/threads/ThreadScreen';
import { PostCommentProvider } from 'src/api/context/ThreadContext';

const Thread = () => {
  return (
    <PostCommentProvider>
      <ThreadScreen />
    </PostCommentProvider>
  );
};

export default Thread;
