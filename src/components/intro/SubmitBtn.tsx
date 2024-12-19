import React from 'react';
import styled from 'styled-components/native';
import { Link } from 'expo-router';

const SubmitButton = () => {
    return (
        <Button>
            <ButtonText href="/login" style={{ letterSpacing: -0.5 }}>
                Get Started
            </ButtonText>
        </Button>
    );
};

const Button = styled.TouchableOpacity`
    background-color: #212121;
    padding: 12px;
    align-items: center;
    border-radius: 30px;
    margin-top: 20px;
    width: 100%;
`;

const ButtonText = styled(Link)`
    font-family: 'DMSans_700Bold';
    font-size: 18px;
    color: #ffffff;
`;

export default SubmitButton;
