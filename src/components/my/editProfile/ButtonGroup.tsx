import React from 'react';
import styled from 'styled-components/native';

interface ButtonGroupProps {
  onSave: () => void;
  onCancel: () => void;
}

const ButtonGroup = ({ onSave, onCancel }: ButtonGroupProps) => (
  <ButtonContainer>
    <StyledButton onPress={onCancel}>
      <StyledButtonText>Cancel</StyledButtonText>
    </StyledButton>
    <StyledButton onPress={onSave}>
      <StyledButtonText>Save</StyledButtonText>
    </StyledButton>
  </ButtonContainer>
);

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #000000;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 0 10px;
`;

const StyledButtonText = styled.Text`
  font-family: 'DMSans_500Medium';
  color: #ffffff;
  font-size: 16px;
`;

export default ButtonGroup;
