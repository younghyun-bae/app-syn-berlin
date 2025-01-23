import React from 'react';
import styled from 'styled-components/native';

interface CommentInputFormProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const MAX_CHARACTERS = 300;

const CommentInputForm: React.FC<CommentInputFormProps> = ({ value, onChangeText, onSubmit }) => {
  return (
    <InputContainer>
      <CommentInput
        placeholder="Leave a comment"
        value={value}
        onChangeText={onChangeText}
        maxLength={MAX_CHARACTERS}
      />
      <AddButton onPress={onSubmit}>
        <ButtonText>Add</ButtonText>
      </AddButton>
    </InputContainer>
  );
};

export default CommentInputForm;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  margin: 0 10px 10px 10px;
`;

const CommentInput = styled.TextInput`
  flex: 1;
  border-width: 1px;
  border-color: #232323;
  border-radius: 20px;
  padding: 10px;
  font-size: 14px;
  background-color: #ffffff;
`;

const AddButton = styled.TouchableOpacity`
  background-color: #232323;
  padding: 12px 20px;
  border-radius: 30px;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  font-family: 'DMSans_500Medium';
  color: #ffffff;
`;
