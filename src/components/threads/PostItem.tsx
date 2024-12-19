import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';

interface Post {
  id: string;
  title: string;
  content: string;
  likes: number;
  author: string;
  createdAt: Date;
  replies: number;
  likedByUser?: boolean;
}

interface PostItemProps {
  post: Post;
  onLike: (postId: string, currentLikes: number, likedByUser: boolean) => void;
  formatDate: (date: Date) => string;
  index: number;
}

const PostItem: React.FC<PostItemProps> = ({ post, onLike, formatDate, index }) => {
  const router = useRouter();

  return (
    <PostContainer style={index === 0 ? { marginTop: 20 } : {}}>
      <PostHeader>
        <Likes onPress={() => onLike(post.id, post.likes, post.likedByUser || false)}>
          <FontAwesomeIcon
            icon={faHeart}
            color={post.likedByUser ? '#CDDC52' : '#C6C6C6'}
          />
          <LikesText>{post.likes}</LikesText>
        </Likes>
      </PostHeader>
      <TouchableOpacity onPress={() => router.push(`/detail/postDetail?postId=${post.id}`)}>
        <Title>{post.title}</Title>
        <AuthorName>{post.author}</AuthorName>
        <Content>{post.content}</Content>
      </TouchableOpacity>
      <PostFooter>
        <Replies>{post.replies} replies</Replies>
        <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
      </PostFooter>
    </PostContainer>
  );
};

export default PostItem;

// Styled Components
const PostContainer = styled.View`
  background-color: #ffffff;
  max-height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const Likes = styled.TouchableOpacity`
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;

const LikesText = styled.Text`
  color: #C6C6C6;
  margin-left: 5px;
`;

const Title = styled.Text`
  font-size: 14px;
  color: #393B65;
  margin-bottom: 5px;
  font-weight: bold;
`;

const AuthorName = styled.Text`
  font-size: 10px;
  color: #7C7C7C;
  margin-bottom: 5px;
`;

const Content = styled.Text`
  font-size: 12px;
  color: #5A5A5F;
  line-height: 18px;
  max-height: 40px;
  overflow: hidden;
`;

const PostFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const Replies = styled.Text`
  font-size: 12px;
  color: #7D7D7D;
`;

const CreatedAt = styled.Text`
  font-size: 12px;
  color: #C6C6C6;
`;
