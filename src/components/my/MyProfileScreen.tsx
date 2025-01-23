import React from 'react';
import { useProfile } from 'src/api/context/ProfileContext';
import { useRouter } from 'expo-router';

import styled from 'styled-components/native';

import LoadingSpinner from '../LoadingSpinner';
import ProfileHeader from './ProfileHeader';
import Section from './Section';
import EditButton from './EditButton';

const MyProfile: React.FC = () => {
    const { state } = useProfile();
    const { profile } = state;
    
    const router = useRouter();

    if (!profile) {
        return <LoadingSpinner />
    }

    return (
        <Container>
            <ProfileContainer>
                <ProfileHeader profile={profile} />
                
                <Section title="Interests" content={profile.interests?.length ? profile.interests.join(', ') : 'No Interests Selected'} />
                <Section title="About Me" content={profile.aboutMe || 'No About Me Information'} />
                <Section title="Proud Work" content={profile.proudWork || 'No Proud Work Added'} />
                <Section title="Portfolio" content={profile.portfolio || 'No Portfolio Added'} />
                <Section title="Languages" content={profile.languages || 'No Languages Added'} />

                <EditButton onPress={() => router.push('/tab_4/editProfile')} />
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

const ProfileContainer = styled.ScrollView`
    flex: 1;
`;
