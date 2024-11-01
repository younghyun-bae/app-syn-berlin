import React, { useState } from 'react';
import styled from 'styled-components/native';

import { useAuth } from '../../../src/api/hooks/useAuth';
import { useRouter } from 'expo-router';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
    const user = useAuth();
    const router = useRouter();

    return (
        <Container>
            <ProfileContainer>
                <ImageContainer>
                    <ProfileImage source={{ uri: user?.photoURL || require('../../../assets/images/default-profile-image.png') }} />
                </ImageContainer>
                <InfoContainer>
                    <ProfileName>{user?.displayName || user?.email}</ProfileName>
                    <Location><FontAwesomeIcon icon={faLocationDot} /> Prenzlauer Berg</Location>
                    <JobTitle>Software Engineer</JobTitle>
                    <MainField>Web & Mobile Frontend</MainField>
                </InfoContainer>
                <SectionContainer>
                    <SectionTitle>Interest</SectionTitle>
                    <InterestContainer>
                        <Interest>Collaboration</Interest>
                        <Interest>Event</Interest>
                    </InterestContainer>
                </SectionContainer>
                <SectionContainer>
                    <SectionTitle>About Me</SectionTitle>
                    <AboutText>Hello, I believe there are many ways to express yourself...</AboutText>
                </SectionContainer>
                <EditButton onPress={() => router.push('/tab_4/editProfile')}>
                    <FontAwesomeIcon icon={faPenToSquare} color="#FFFFFF" />
                </EditButton>
            </ProfileContainer>
        </Container>
    );
};

export default MyProfile;

const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: #FFF;
`;

const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.Text`
    font-family: 'DMSans-Bold';
    font-size: 24px;
`;

const ProfileContainer = styled.View`
    margin-top: 20px;
`;

const ImageContainer = styled.View`
    border-radius: 50px;
    overflow: hidden;
    align-items: center;
    margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
    width: 120px;
    height: 120px;
`;

const InfoContainer = styled.View`
    align-items: center;
`;

const ProfileName = styled.Text`
    font-family: 'DMSans-Bold';
    font-size: 20px;
`;

const Location = styled.Text`
    font-family: 'DMSans-Bold';
    font-size: 14px;
    color: #232323;
`;

const JobTitle = styled.Text`
    font-family: 'DMSans-Bold';
    font-size: 18px;
`;

const MainField = styled.Text`
    font-family: 'DMSans-Bold';
    font-size: 16px;
    color: #232323;
`;

const SectionContainer = styled.View`
    margin: 15px 0;
`;

const SectionTitle = styled.Text`
    font-family: 'DMSans-Bold';
    font-size: 18px;
`;

const AboutText = styled.Text`
    font-size: 14px;
    color: #232323;
`;

const InterestContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 30px;
`;

const Interest = styled.Text`
    margin: 4px;
    padding: 4px 8px;
    border-radius: 20px;
    background-color: #f3f3f3;
`;

const EditButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #232323;
    padding: 10px;
    border-radius: 50px;
`;
