import React from 'react';
import styled from 'styled-components/native';

interface PostDetailProps {
  title: string;
  author: string;
  content: string;
  createdAt: any;
  jobTitle?: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ author, jobTitle, title, content, createdAt }) => {
  
  const formatDate = (date?: Date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return 'Unknown Date';
    }
  
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <PostContainer>
      <Title>{title}</Title>
      <AuthorDate>
        <AuthorName>{author} {jobTitle ? `(${jobTitle})` : ''}</AuthorName>
        <Date>{formatDate(createdAt)}</Date>
      </AuthorDate>
      <Content>{content}</Content>
    </PostContainer>
  );
};

export default PostDetail;

const PostContainer = styled.View`
  background-color: #ffffff;
  padding: 20px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #393b65;
  margin-bottom: 10px;
`;

const AuthorDate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AuthorName = styled.Text`
  font-size: 10px;
  color: #7C7C7C;
  margin-bottom: 5px;
`;

const Date = styled.Text`
  font-size: 10px;
  color: #7C7C7C;
`;

const Content = styled.Text`
  font-size: 16px;
  color: #5a5a5f;
  line-height: 22px;
  margin-bottom: 10px;
`;
