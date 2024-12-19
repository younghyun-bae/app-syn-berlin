import React from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';

const CreateButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button onPress={() => router.push('/detail/post')}>
      <FontAwesomeIcon icon={faPenNib} color="#FFFFFF" size={25} />
    </Button>
  );
};

export default CreateButton;

const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #232323;
  padding: 15px;
  border-radius: 50px;
`;
