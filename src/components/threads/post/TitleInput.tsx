import React from 'react';
import styled from 'styled-components/native';

interface TitleInputProps {
  value: string;
  onChangeText: (text: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ value, onChangeText, isFocused, onFocus, onBlur }) => {
  return (
    <StyledTextInput
      placeholder="Title"
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      isFocused={isFocused}
      maxLength={50}
    />
  );
};

export default TitleInput;

const StyledTextInput = styled.TextInput<{ isFocused: boolean }>`
  width: 280px;
  height: 40px;
  border-width: ${({ isFocused }) => (isFocused ? '2px' : '1px')};
  border-color: ${({ isFocused }) => (isFocused ? '#9082C3' : '#232323')};
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 15px;
`;
