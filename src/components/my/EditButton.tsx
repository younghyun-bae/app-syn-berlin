import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface EditButtonProps {
    onPress: () => void;
}

const EditButton = ({ onPress }: EditButtonProps) => (
    <ButtonContainer>
        <EditButtonStyled onPress={onPress}>
            <FontAwesomeIcon icon={faPenToSquare} color="#FFFFFF" size={18} />
            <EditButtonText>Edit Profile</EditButtonText>
        </EditButtonStyled>
    </ButtonContainer>
);

export default EditButton;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
`;

const EditButtonStyled = styled(TouchableOpacity)`
    background-color: #232323;
    padding: 15px 20px;
    border-radius: 30px;
    flex-direction: row;
    align-items: center;
`;

const EditButtonText = styled.Text`
    color: #FFFFFF;
    font-family: 'DMSans_500Medium';
    font-size: 16px;
    margin-left: 10px;
`;
