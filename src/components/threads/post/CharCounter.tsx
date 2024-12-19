import React from 'react';
import styled from 'styled-components/native';

interface CharCounterProps {
  currentLength: number;
  maxLength: number;
}

const CharCounter: React.FC<CharCounterProps> = ({ currentLength, maxLength }) => {
  return <CharCount>{`${currentLength}/${maxLength}`}</CharCount>;
};

export default CharCounter;

const CharCount = styled.Text`
  align-self: flex-end;
  font-size: 12px;
  color: #7d7d7d;
  margin-bottom: 15px;
`;
