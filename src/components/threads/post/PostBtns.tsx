import React from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

interface PostButtonsProps {
  onSubmit: () => void;
}

const PostButtons: React.FC<PostButtonsProps> = ({ onSubmit }) => {
  const router = useRouter();

  return (
    <ButtonContainer>
      <CancelButton onPress={() => router.back()}>
        <ButtonText>Cancel</ButtonText>
      </CancelButton>
      <PostButton onPress={onSubmit}>
        <ButtonText>Post</ButtonText>
      </PostButton>
    </ButtonContainer>
  );
};

export default PostButtons;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #d3d3d3;
  padding: 10px 20px;
  border-radius: 50px;
`;

const PostButton = styled.TouchableOpacity`
  background-color: #9082C3;
  padding: 10px 20px;
  border-radius: 50px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
