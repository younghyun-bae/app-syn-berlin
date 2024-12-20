import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

interface FormItemProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  editable?: boolean;
}

const FormItem = ({ label, value, placeholder, onChangeText, multiline = false, editable = true }: FormItemProps) => (
  <Container>
    <Label>{label}</Label>
    <StyledTextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      multiline={multiline}
      editable={editable}
    />
  </Container>
);

const Container = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-family: 'DMSans_700Bold';
`;

const StyledTextInput = styled(TextInput)`
  border-radius: 10px;
  background-color: rgba(229, 229, 229, 0.7);
  padding: 10px;
  color: #5a5a5f;
  border: 1px solid transparent;
  height: ${(props) => (props.multiline ? '100px' : '40px')};
`;

export default FormItem;
