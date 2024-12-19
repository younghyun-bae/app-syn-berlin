import React from 'react';
import styled from 'styled-components/native';

interface PostDetailProps {
  title: string;
  content: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ title, content }) => {
  return (
    <PostContainer>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </PostContainer>
  );
};

export default PostDetail;

const PostContainer = styled.View`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
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

const Content = styled.Text`
  font-size: 16px;
  color: #5a5a5f;
  line-height: 22px;
`;
