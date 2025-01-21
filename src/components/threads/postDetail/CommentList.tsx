import React from 'react';
import { FlatList } from 'react-native';
import CommentItem from './CommentItem';
import { Comment } from 'src/api/context/PostContext';
interface CommentListProps {
  comments: Comment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <CommentItem
          id={item.id}
          author={item.author}
          content={item.content}
          createdAt={item.createdAt}
          isAuthor={item.isAuthor}
          jobTitle={item.jobTitle}
          onEdit={() => item.onEdit()}
          onDelete={() => item.onDelete()}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CommentList;
