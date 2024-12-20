import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ProfileImageUploadProps {
  onUpload: () => void;
  imageUrl?: string;
}

const ProfileImageUpload = ({ onUpload, imageUrl }: ProfileImageUploadProps) => (
  <ImageContainer>
    <UploadButton onPress={onUpload}>
      {imageUrl ? (
        <UploadedImage source={{ uri: imageUrl }} />
      ) : (
        <FontAwesomeIcon icon={faPlus} size={30} color="#5A5A5F" />
      )}
    </UploadButton>
  </ImageContainer>
);

const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const UploadButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const UploadedImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export default ProfileImageUpload;
