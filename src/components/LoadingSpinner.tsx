import React from 'react';
import styled from 'styled-components/native';

const LoadingSpinner = () => (
    <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
);

export default LoadingSpinner;

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
`;

const LoadingText = styled.Text`
    font-family: 'DMSans_700Bold';
    font-size: 18px;
    color: #7C7C7C;
`;
