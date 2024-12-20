import React from 'react';
import styled from 'styled-components/native';

interface SectionProps {
    title: string;
    content: string;
}

const Section = ({ title, content }: SectionProps) => (
    <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        <ContentText>{content}</ContentText>
    </SectionContainer>
);

export default Section;

const SectionContainer = styled.View`
    background-color: rgba(229, 229, 229, 0.2);
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 15px;
`;

const SectionTitle = styled.Text`
    font-family: 'DMSans_700Bold';
    font-size: 18px;
    color: #232323;
    margin-bottom: 10px;
`;

const ContentText = styled.Text`
    font-family: 'DMSans_500Medium';
    font-size: 14px;
    color: #5A5A5F;
`;
