import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/firebase';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import LoadingSpinner from '../LoadingSpinner';
import ProfileHeader from './ProfileHeader';
import Section from './Section';
import EditButton from './EditButton';
import { User } from 'firebase/auth';

interface MyProfileProps {
    user: User | null;
}

const MyProfile: React.FC<MyProfileProps> = ({ user }) => {
    const router = useRouter();

    interface Profile {
        displayName: string;
        location: string;
        jobTitle: string;
        mainField: string;
        aboutMe: string;
        interests: string[];
        proudWork: string;
        portfolio: string;
        languages: string;
    }

    const [profile, setProfile] = useState<Profile>({
        displayName: '',
        location: '',
        jobTitle: '',
        mainField: '',
        aboutMe: '',
        interests: [],
        proudWork: '',
        portfolio: '',
        languages: '',
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                try {
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setProfile({
                            displayName: data.displayName || '',
                            location: data.location || '',
                            jobTitle: data.jobTitle || '',
                            mainField: data.mainField || '',
                            aboutMe: data.aboutMe || '',
                            interests: data.interests || [],
                            proudWork: data.proudWork || '',
                            portfolio: data.portfolio || '',
                            languages: data.languages || '',
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <ProfileContainer>
                <ProfileHeader profile={profile} photoURL={user?.photoURL} email={user?.email} />
                
                <Section title="Interests" content={profile.interests.length ? profile.interests.join(', ') : 'No Interests Selected'} />
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
