import React from 'react';
import { useProfile } from 'src/api/context/ProfileContext';
import { useRouter } from 'expo-router';

import styled from 'styled-components/native';

import ProfileHeader from './ProfileHeader';
import Section from './Section';
import EditButton from './EditButton';

const MyProfile: React.FC = () => {
    const { state } = useProfile();
    const { profile } = state;
    
    const router = useRouter();

    if (profile === null) {
        return (
            <Container>
                <MessageContainer>
                    <MessageText>Create your profile to start exploring!</MessageText>
                </MessageContainer>
                <EditButton onPress={() => router.push('/tab_4/editProfile')} />
            </Container>
        );
    }

    return (
        <Container>
            <ProfileContainer>
                <ProfileHeader profile={profile} />
                
                <Section title="Interests" content={profile.interests?.length ? profile.interests.join(', ') : 'No Interests Selected'} />
                <Section title="About Me" content={profile.aboutMe || 'No About Me Information'} />
                <Section title="Proud Work" content={profile.proudWork || 'No Proud Work Added'} />
                <Section title="Portfolio" content={profile.portfolio || 'No Portfolio Added'} />
                <Section 
                    title="Languages" 
                    content={Array.isArray(profile.languages) && profile.languages.length ? profile.languages.join(', ') : 'No Languages Added'}
                />
            </ProfileContainer>
            <EditButton onPress={() => router.push('/tab_4/editProfile')} />
        </Container>
    );
};

export default MyProfile;

const Container = styled.View`
    flex: 1;
    background-color: #FFF;
    padding-bottom: 0;
`;

const ProfileContainer = styled.ScrollView`
    flex: 1;
    padding: 10px 25px;
`;

const MessageContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const MessageText = styled.Text`
    font-family: 'DMSans_500Medium_Italic';
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
`;