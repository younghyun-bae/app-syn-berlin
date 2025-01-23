import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan, faFilePen } from '@fortawesome/free-solid-svg-icons';

interface CommentProps {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  jobTitle?: string;
  isAuthor: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onContentChange?: (newContent: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  isEditing: boolean; 
}

const CommentItem: React.FC<CommentProps> = ({
  content,
  author,
  jobTitle,
  createdAt,
  isAuthor,
  onEdit,
  onDelete,
  onContentChange,
  onSave,
  onCancel,
  isEditing
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthor && isEditing && onContentChange) {
      onContentChange(content);
    }
  }, [isEditing, onContentChange, content]);

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
      {isEditing ? (
        <ContentInput
          value={content}
          onChangeText={onContentChange}
          autoFocus
        />
      ) : (
        <CommentText>{content}</CommentText>
      )}
      <ActionButtons>
        {isAuthor && onDelete && (
          <ActionButton 
            onPress={onDelete}
            onPressIn={() => setHoveredButton('delete')}
            onPressOut={() => setHoveredButton(null)}
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              color={hoveredButton === 'delete' ? '#5A5A5F' : '#C6C6C6'}
            />
          </ActionButton>
        )}
        {isAuthor && isEditing ? (
          <EditBtns>
            <CancelButton onPress={() => {
              onCancel && onCancel();
              setHoveredButton(null);
            }}>
              <ButtonText>Cancel</ButtonText>
            </CancelButton>
            <SaveButton onPress={() => {
              onSave && onSave();
              setHoveredButton(null);
            }}>
              <ButtonText>Save</ButtonText>
            </SaveButton>
          </EditBtns>
        ) : (
          isAuthor && (
            <ActionButton 
              onPress={onEdit}
              onPressIn={() => setHoveredButton('edit')}
              onPressOut={() => setHoveredButton(null)}
            >
              <FontAwesomeIcon 
                icon={faFilePen}
                color={hoveredButton === 'edit' ? '#5A5A5F' : '#C6C6C6'}
              />
            </ActionButton>
          )
        )}
      </ActionButtons>
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

const ContentInput = styled.TextInput`
  font-size: 16px;
  color: #5a5a5f;
  line-height: 22px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
`;

const CommentDate = styled.Text`
  font-size: 10px;
  color: #A8A8A8;
`;

const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const ActionButton = styled.Text`
  font-size: 12px;
  color: #007BFF;
`;

const EditBtns = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #232323;
  padding: 5px;
  border-radius: 30px;
  margin: 0 10px
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #232323; 
  padding: 5px;
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  font-family: 'DMSans_500Medium';
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 10px;
`;