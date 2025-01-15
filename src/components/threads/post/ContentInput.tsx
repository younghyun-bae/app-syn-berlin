import React from 'react';
import styled from 'styled-components/native';

interface ContentInputProps {
  value: string;
  onChangeText: (text: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  maxLength: number;
}

const ContentInput: React.FC<ContentInputProps> = ({ value, onChangeText, isFocused, onFocus, onBlur, maxLength }) => {
  return (
    <StyledContentInput
      placeholder="Posts may be removed if they contain inappropriate content by AI and administrator."
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      isFocused={isFocused}
      multiline
      maxLength={maxLength}
    />
  );
};

export default ContentInput;

const StyledContentInput = styled.TextInput<{ isFocused: boolean }>`
  width: 280px;
  height: 280px;
  border-width: ${({ isFocused }) => (isFocused ? '2px' : '1px')};
  border-color: ${({ isFocused }) => (isFocused ? '#9082C3' : '#232323')};
  border-radius: 20px;
  padding: 12px;
  text-align-vertical: top;
  margin-bottom: 10px;
`;
