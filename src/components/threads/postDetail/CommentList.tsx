import React from 'react';
import { FlatList } from 'react-native';
import CommentItem from './CommentItem';

interface Comment {
  id: string;
  content: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => <CommentItem content={item.content} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CommentList;
