import React from 'react';
import styled from 'styled-components/native';

const IntroTextSection = () => {
    return (
        <IntroText style={{ letterSpacing: -0.5 }}>
            Unleash Potential, {"\n"}
            Connect, and Create in Berlin
        </IntroText>
    );
};

const IntroText = styled.Text`
    font-size: 20px;
    font-family: 'DMSans_500Medium';
    text-align: center;
    margin-bottom: 80px;
    color: #232323;
`;

export default IntroTextSection;
