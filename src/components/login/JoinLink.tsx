import React from 'react';
import styled from 'styled-components/native';

interface JoinLinkProps {
  onPress: () => void;
}

const JoinLink = ({ onPress }: JoinLinkProps) => {
  return (
    <JoinText>
      Don't have an account?{' '}
      <JoinLinkText onPress={onPress}>Join Berlin's Creative Hub</JoinLinkText>
    </JoinText>
  );
};

const JoinText = styled.Text`
  margin-top: 10px;
`;

const JoinLinkText = styled.Text`
  color: #9082c3;
  font-weight: bold;
`;

export default JoinLink;
