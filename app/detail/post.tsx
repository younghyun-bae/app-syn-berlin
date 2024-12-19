import React, { useState } from 'react';
import { db } from '../../src/api/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, Stack } from 'expo-router';
import styled from 'styled-components/native';
import TitleInput from '../../src/components/threads/post/TitleInput';
import ContentInput from '../../src/components/threads/post/ContentInput';
import CharCounter from '../../src/components/threads/post/CharCounter';
import PostBtns from '../../src/components/threads/post/PostBtns';

export default function PostScreen() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);
  const router = useRouter();
  const maxContentLength = 2000;

  const handleSubmit = async () => {
    const postsRef = collection(db, 'posts');
    await addDoc(postsRef, {
      title,
      content,
      likes: 0,
      createdAt: serverTimestamp(),
    });
    setTitle('');
    setContent('');
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Create a post',
          headerBackTitle: 'List',
          headerTransparent: true,
        }}
      />
      <Container>
        <PostBox>
          <TitleInput
            value={title}
            onChangeText={setTitle}
            isFocused={isTitleFocused}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
          />
          <ContentInput
            value={content}
            onChangeText={setContent}
            isFocused={isContentFocused}
            onFocus={() => setIsContentFocused(true)}
            onBlur={() => setIsContentFocused(false)}
            maxLength={maxContentLength}
          />
          <CharCounter currentLength={content.length} maxLength={maxContentLength} />
          <PostBtns onSubmit={handleSubmit} />
        </PostBox>
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.View`
  width: 270px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 30px;
  padding: 20px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
  align-items: center;
`;
