import React, { useState } from 'react';
import { useAuth } from 'src/api/context/AuthContext';
import { useProfile } from 'src/api/context/ProfileContext';
import { db } from '../../../api/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, Stack } from 'expo-router';
import styled from 'styled-components/native';
import TitleInput from './TitleInput';
import ContentInput from './ContentInput';
import CharCounter from './CharCounter';
import PostBtns from './PostBtns';
import { Alert } from 'react-native';

interface PostScreenProps {
  onClose: () => void;
}

const PostScreen: React.FC<PostScreenProps> = ({ onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const router = useRouter();

  const { state: authState } = useAuth();
  const { user } = authState;

  const { state } = useProfile();
  const { profile } = state;

  const maxContentLength = 2000;

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("It's empty", "Please enter what you want to share.");
      return;
    }

    if (user && profile) {
      try {
        const postsRef = collection(db, 'posts');
        await addDoc(postsRef, {
          authorId: user.uid,
          author: user.displayName,
          jobTitle: profile.jobTitle,
          title,
          content,
          createdAt: serverTimestamp(),
          likes: 0,
          replies: 0,
        });
        setTitle('');
        setContent('');
        Alert.alert(
          "Post Successful",
          "Your post has been added.",
          [{ text: "OK", onPress: () => {
            onClose();
            router.push('/threads');
          }}]
        );
      } catch (error) {
        console.log("Error adding new post: ", error);
      }
    } else {
      console.log("No authenticated user");
    }
  };

  const handleCancel = () => {
    onClose();
    router.push('/threads');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Create new post',
          headerBackTitle: 'List',
          headerTransparent: false,
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
          <PostBtns onSubmit={handleSubmit} onClose={handleCancel} />
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
  width: 320px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 30px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 5;
  align-items: center;
`;

export default PostScreen;