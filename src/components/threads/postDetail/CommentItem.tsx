import React from 'react';
import styled from 'styled-components/native';

interface CommentItemProps {
  content: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ content }) => {
  return (
    <CommentContainer>
      <CommentText>{content}</CommentText>
    </CommentContainer>
  );
};

export default CommentItem;

const CommentContainer = styled.View`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  elevation: 2;
  margin-bottom: 10px;
`;

const CommentText = styled.Text`
  font-size: 14px;
  color: #393b65;
`;
