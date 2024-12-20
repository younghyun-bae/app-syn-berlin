import React from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

interface InputFieldProps extends TextInputProps {
  label: string;
}

const InputField = ({ label, ...props }: InputFieldProps) => (
  <FormItem>
    <Label>{label}</Label>
    <StyledTextInput {...props} />
  </FormItem>
);

const FormItem = styled.View`
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

export default InputField;
