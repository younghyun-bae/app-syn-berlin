import React from 'react';
import styled from 'styled-components/native';

interface CommentProps {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  jobTitle?: string;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const CommentItem: React.FC<CommentProps> = ({ content, author, jobTitle, createdAt, isAuthor, onEdit, onDelete }) => {
  const formattedDate = createdAt instanceof Date ? createdAt.toLocaleDateString() : 'Invalid Date';

  return (
    <CommentContainer>
      <CommentHeader>
        <AuthorName>
          {author} {jobTitle ? `(${jobTitle})` : ''}
        </AuthorName>
        <CommentDate>
        {formattedDate}
      </CommentDate>
      </CommentHeader>
      <CommentText>{content}</CommentText>
      {isAuthor && (
        <ActionButtons>
          <ActionButton onPress={onEdit}>Edit</ActionButton>
          <ActionButton onPress={onDelete}>Delete</ActionButton>
        </ActionButtons>
      )}
    </CommentContainer>
  );
};

export default CommentItem;

const CommentContainer = styled.View`
  background-color: #ffffff;
  padding: 15px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  elevation: 2;
  margin-bottom: 10px;
`;

const CommentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AuthorName = styled.Text`
  font-size: 10px;
  color: #7C7C7C;
  margin-bottom: 5px;
`;

const CommentText = styled.Text`
  font-size: 14px;
  color: #393b65;
`;

const CommentDate = styled.Text`
  font-size: 10px;
  color: #A8A8A8;
`;

const ActionButtons = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const ActionButton = styled.Text`
  font-size: 12px;
  color: #007BFF;
  margin-right: 15px;
  cursor: pointer;
`;