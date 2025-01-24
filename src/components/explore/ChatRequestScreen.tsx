import React, { useState } from 'react';
import { useAuth } from 'src/api/context/AuthContext';
import { useProfile } from 'src/api/context/ProfileContext';

import { db } from 'src/api/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, Stack } from 'expo-router';
import styled from 'styled-components/native';

import ContentInput from '../threads/post/ContentInput';
import CharCounter from '../threads/post/CharCounter';
import PostButtons from '../threads/post/PostBtns';
import { Alert } from 'react-native';

interface ChatRequestProps {
  onClose: () => void;
  recieverName: string;
  eachUserUid: string;
}

const ChatRequestScreen: React.FC<ChatRequestProps> = ({ onClose, eachUserUid, recieverName }) => {
  const [content, setContent] = useState<string>('');
  const [isContentFocused, setIsContentFocused] = useState(false);

  const router = useRouter();

  const { state: authState } = useAuth();
  const { user } = authState;

  const { state } = useProfile();
  const { profile } = state;

  const maxContentLength = 300;


  // it should be changed properly with real-time messaging logic
  const handleRequest = async () => {
    if (!content.trim()) {
      Alert.alert("It's empty", "Please enter a note for a request.");
      return;
    }

    if (user && profile) {
      try {
        const postsRef = collection(db, 'requests');
        await addDoc(postsRef, {
          authorId: user.uid,
          author: user.displayName,
          jobTitle: profile.jobTitle,
          content,
          createdAt: serverTimestamp(),
        });
        setContent('');
        Alert.alert(
          "Sent Successful",
          "Your chat request has been sent.",
          [{ text: "OK", onPress: () => {
            onClose();
            router.push(`/tab_2/eachUser?uid=${eachUserUid}`);
          }}]
        );
      } catch (error) {
        console.log("Error adding new request: ", error);
      }
    } else {
      console.log("No authenticated user");
    }
  };

  const handleCancel = () => {
    onClose();
    router.push(`/tab_2/eachUser?uid=${eachUserUid}`);
  };

  return (
    <>
    {/* Almost similar with PostScreen */}
      <Stack.Screen
        options={{
          headerTitle: `Chat request`,
          headerBackTitle: 'List',
          headerTransparent: false,
        }}
      />
      <Container>
        <PostBox>
          <HeaderText>Leave a note to {`${recieverName}`}</HeaderText>
          {/* need to modify content attributes */}
          <ContentInput
            value={content}
            onChangeText={setContent}
            isFocused={isContentFocused}
            onFocus={() => setIsContentFocused(true)}
            onBlur={() => setIsContentFocused(false)}
            maxLength={maxContentLength}
          />
          <CharCounter currentLength={content.length} maxLength={maxContentLength} />
          {/* need to modify buttons */}
          <PostButtons onSubmit={handleRequest} onClose={handleCancel} />
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

const HeaderText = styled.Text`
  margin-bottom: 10px;
  font-family: 'DMSans_500Medium';
`;

export default ChatRequestScreen;