import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faYoutube, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

interface SocialMediaInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SocialMediaInput = ({ value, onChangeText }: SocialMediaInputProps) => {
  const getIcon = (url: string) => {
    if (url.includes('youtube.com')) return faYoutube;
    if (url.includes('instagram.com')) return faInstagram;
    if (url.includes('github.com')) return faGithub;
    return faUpRightFromSquare;
  };

  return (
    <Container>
      <Label>Social Media / Portfolio</Label>
      <StyledTextInput
        value={value}
        placeholder="Add URL"
        onChangeText={onChangeText}
      />
      {value ? (
        <TouchableOpacity onPress={() => Linking.openURL(value)}>
          <FontAwesomeIcon icon={getIcon(value)} size={30} color="#5A5A5F" />
        </TouchableOpacity>
      ) : null}
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-family: 'DMSans_700Bold';
`;

const StyledTextInput = styled.TextInput`
  border-radius: 10px;
  background-color: rgba(229, 229, 229, 0.7);
  padding: 10px;
  color: #5a5a5f;
  border: 1px solid transparent;
`;

export default SocialMediaInput;
