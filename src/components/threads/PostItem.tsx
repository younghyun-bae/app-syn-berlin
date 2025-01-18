import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/native';

import { Post } from '../../types/postTypes';

interface PostItemProps {
  post: Post;
  onLike: (postId: string, currentLikes: number, likedByUser: boolean) => void;
  formatDate: (date: Date) => string;
  index: number;
  testID?: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, onLike, formatDate, index, testID }) => {
  const router = useRouter();

  return (
    <PostContainer style={index === 0 ? { marginTop: 20 } : {}} testID={testID}>
      <PostHeader>
        <TouchableOpacity onPress={() => router.push(`/detail/postDetail?postId=${post.id}`)} style={{ flex: 1 }}>
          <Title numberOfLines={1}>{post.title}</Title>
        </TouchableOpacity>
        <Likes onPress={() => onLike(post.id, post.likes, post.likedByUser || false)} testID={`like-button-${index}`}>
          <FontAwesomeIcon
            icon={faHeart}
            color={post.likedByUser ? '#CDDC52' : '#C6C6C6'}
          />
          <LikesText>{post.likes}</LikesText>
        </Likes>
      </PostHeader>
      <TouchableOpacity onPress={() => router.push(`/detail/postDetail?postId=${post.id}`)}>
        <AuthorName>
          {post.author} {post.jobTitle ? `(${post.jobTitle})` : ''}
        </AuthorName>
        <Content numberOfLines={2}>{post.content}</Content>
      </TouchableOpacity>
      <PostFooter>
        <Replies>
          <NumReplies>{post.replies}&nbsp;&nbsp;</NumReplies>
          <FontAwesomeIcon
              icon={faCommentDots}
              color={'#C6C6C6'}
            />
        </Replies>

        <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
      </PostFooter>
    </PostContainer>
  );
};

export default PostItem;

const PostContainer = styled.View`
  background-color: #ffffff;
  max-height: 150px;
  margin-bottom: 10px;
  padding: 10px 20px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  font-weight: bold;
  margin-right: 10px;
  overflow: hidden;
`;

const AuthorName = styled.Text`
  font-size: 10px;
  color: #7C7C7C;
  margin-bottom: 10px;
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

const Replies = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NumReplies = styled.Text`
  font-size: 12px;
  color: #7D7D7D;
`;

const CreatedAt = styled.Text`
  font-size: 12px;
  color: #C6C6C6;
`;