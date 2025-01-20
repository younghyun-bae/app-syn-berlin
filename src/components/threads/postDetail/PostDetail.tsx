import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan, faFilePen } from '@fortawesome/free-solid-svg-icons';
interface PostDetailProps {
  title: string;
  author: string;
  content: string;
  createdAt: any;
  jobTitle?: string;
  isAuthor: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onContentChange?: (newContent: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  isEditing: boolean; 
}

const PostDetail: React.FC<PostDetailProps> = ({ author, jobTitle, title, content, createdAt, onEdit, onDelete, onContentChange, onSave, onCancel, isEditing, isAuthor }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  
  useEffect(() => {
    if (isAuthor && isEditing && onContentChange) {
      onContentChange(content);
    }
  }, [isEditing, onContentChange, content]);

  const formatDate = (date?: any) => {
    if (!date || Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime())) {
      return 'Unknown Date';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <PostContainer>
      <Title>{title}</Title>
      <AuthorDate>
        <AuthorName>
          {author} {jobTitle ? `(${jobTitle})` : ''}
        </AuthorName>
        <Date>{formatDate(createdAt)}</Date>
      </AuthorDate>
      {isEditing ? (
        <ContentInput
          value={content}
          onChangeText={onContentChange}
          autoFocus
        />
      ) : (
        <Content>{content}</Content>
      )}
      <AuthorFooter>
        {isAuthor && onDelete && (
          <IconButton
            onPress={onDelete}
            onPressIn={() => setHoveredButton('delete')}
            onPressOut={() => setHoveredButton(null)}
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              color={hoveredButton === 'delete' ? '#5A5A5F' : '#C6C6C6'}
            />
          </IconButton>
        )}
        {isAuthor && isEditing ? (
          <EditBtns>
            <CancelButton onPress={onCancel}>
              <ButtonText>Cancel</ButtonText>
            </CancelButton>
            <SaveButton onPress={onSave}>
              <ButtonText>Save</ButtonText>
            </SaveButton>
          </EditBtns>
        ) : (
          isAuthor && (
            <IconButton
              onPress={onEdit}
              onPressIn={() => setHoveredButton('edit')}
              onPressOut={() => setHoveredButton(null)}
            >
              <FontAwesomeIcon 
                icon={faFilePen}
                color={hoveredButton === 'edit' ? '#5A5A5F' : '#C6C6C6'}
              />
            </IconButton>
          )
        )}
      </AuthorFooter>
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

const ContentInput = styled.TextInput`
  font-size: 16px;
  color: #5a5a5f;
  line-height: 22px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
`;

const AuthorFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`
const IconButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const EditBtns = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #232323;
  padding: 10px;
  border-radius: 30px;
  margin: 0 10px
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #232323; 
  padding: 10px;
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  font-family: 'DMSans_500Medium';
  color: white;
  font-weight: bold;
  text-align: center;
`;