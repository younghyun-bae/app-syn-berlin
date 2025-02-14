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
            <FontAwesomeIcon icon={faPenToSquare} color="#FFFFFF" size={28} />
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
    position: absolute;
    bottom: 30px;
    right: 30px;
    background-color: #232323;
    padding: 15px;
    border-radius: 50px;
`;
