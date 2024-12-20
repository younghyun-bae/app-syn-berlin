import React from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

interface ProfileHeaderProps {
    profile: {
        displayName: string;
        location: string;
        jobTitle: string;
        mainField: string;
    };
    photoURL: string | null | undefined;
    email: string | null | undefined;
}

const ProfileHeader = ({ profile, photoURL, email }: ProfileHeaderProps) => (
    <HeaderContainer>
        <ImageContainer>
            <ProfileImage source={{ uri: photoURL || require('../../../assets/images/default-profile-image.png') }} />
        </ImageContainer>
        <InfoContainer>
            <ProfileName>{profile.displayName || email}</ProfileName>
            <Location>
                <FontAwesomeIcon icon={faLocationDot} size={16} color="#5A5A5F" />
                {' '}
                {profile.location || 'Not Set'}
            </Location>
            <JobTitle>{profile.jobTitle || 'No Job Title'}</JobTitle>
            <MainField>{profile.mainField || 'No Main Field'}</MainField>
        </InfoContainer>
    </HeaderContainer>
);

export default ProfileHeader;

const HeaderContainer = styled.View`
    align-items: center;
    margin-bottom: 20px;
`;

const ImageContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    background-color: #e5e5e5;
`;

const InfoContainer = styled.View`
    align-items: center;
`;

const ProfileName = styled.Text`
    font-family: 'DMSans_700Bold';
    font-size: 24px;
    color: #232323;
    margin-bottom: 5px;
`;

const Location = styled.Text`
    font-family: 'DMSans_500Medium';
    font-size: 14px;
    color: #5A5A5F;
    margin-bottom: 10px;
`;

const JobTitle = styled.Text`
    font-family: 'DMSans_500Medium';
    font-size: 16px;
    color: #5A5A5F;
`;

const MainField = styled.Text`
    font-family: 'DMSans_500Medium';
    font-size: 16px;
    color: #5A5A5F;
`;
