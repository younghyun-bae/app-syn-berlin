import React from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

interface PostButtonsProps {
  onSubmit: () => void;
  onClose: () => void;
}

const PostButtons: React.FC<PostButtonsProps> = ({ onSubmit, onClose }) => {
  const router = useRouter();

  return (
    <ButtonContainer>
      <StyledButton onPress={onClose} backgroundColor="#d3d3d3">
        <StyledButtonText>Cancel</StyledButtonText>
      </StyledButton>
      <StyledButton onPress={onSubmit} backgroundColor="#CDDC52">
        <StyledButtonText>Create</StyledButtonText>
      </StyledButton>
    </ButtonContainer>
  );
};

export default PostButtons;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const StyledButton = styled.TouchableOpacity<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  padding: 10px 17px;
  margin: 0 12px;
`;

const StyledButtonText = styled.Text`
  font-family: 'DMSans_500Medium';
  color: #232323;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
