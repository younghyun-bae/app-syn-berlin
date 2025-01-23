import React, { useState } from 'react';
import { FlatList } from 'react-native';
import CommentItem from './CommentItem';
import { Comment } from 'src/api/context/PostContext';
import { useAuth } from 'src/api/context/AuthContext';

interface CommentListProps {
  comments: Comment[];
  onEdit: (commentId: string, updatedContent: string) => void;
  onDelete: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onEdit, onDelete }) => {
  const { state: authState } = useAuth();
  const { user } = authState;

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <CommentItem
          id={item.id}
          author={item.author}
          content={editingCommentId === item.id ? editingContent : item.content}
          createdAt={item.createdAt}
          isAuthor={item.authorId === user?.uid}
          jobTitle={item.jobTitle}
          isEditing={item.authorId === user?.uid ? editingCommentId === item.id : false}
          onEdit={() => {
            setEditingCommentId(item.id);
            setEditingContent(item.content);
          }}
          onDelete={() => onDelete(item.id)}
          onContentChange={setEditingContent}
          onSave={() => {
            onEdit(item.id, editingContent);
            setEditingCommentId(null);
          }}
          onCancel={() => setEditingCommentId(null)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CommentList;