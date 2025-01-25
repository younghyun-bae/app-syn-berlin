import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'src/api/firebase';
import { useProfile } from 'src/api/context/ProfileContext';
import { Profile } from 'src/api/context/ProfileContext';
import { useAuth } from 'src/api/context/AuthContext';
import { useRouter } from 'expo-router';

import FormItem from './FormItem';
import InterestSelector from './InterestSelector';
import ProfileImgUpload from './ProfileImgUpload';
import SocialMediaInput from './SocialMediaInput';
import ButtonGroup from './ButtonGroup';

import styled from 'styled-components/native';

import { Alert } from 'react-native';

const EditProfileScreen: React.FC = () => {
  const { state, dispatch } = useProfile();
  const { state: authState } = useAuth();
  const { profile } = state;
  const { user } = authState;
  const router = useRouter();

  const [localProfile, setLocalProfile] = useState<Profile>({
    ...profile,
    interests: profile?.interests || [],
    languages: profile?.languages || [],
  });

  useEffect(() => {
    if (profile) {
      setLocalProfile({ ...profile, interests: profile.interests || [], languages: profile.languages || [] });
    }
  }, [profile]);

  const handleSave = async () => {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { ...localProfile }, { merge: true });
        dispatch({ type: 'UPDATE_PROFILE', payload: localProfile });
        console.log('Profile edited successfully');
        router.replace('/tab_4');
        router.back();
      } catch (error) {
        console.error('EditProfileScreen: Error updating profile:', error);
        Alert.alert("Please Try Again" ,"There was an error saving your profile.");
      }
    } else {
      console.log('EditProfileScreen: User is not authenticated');
      Alert.alert("User not found", "You must be logged in to save your profile.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleChange = (key: keyof Profile, value: any) => {
    setLocalProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container>
      <EditScrollContainer>
        <ProfileImgUpload onUpload={() => {}} />

        <FormItem 
          label="Name" 
          value={localProfile.displayName || ''} 
          placeholder="First Name, Surname" 
          onChangeText={(text) => handleChange('displayName', text)} 
        />
        <FormItem 
          label="Location" 
          value={localProfile.location || ''} 
          placeholder="City or Area You're based in" 
          onChangeText={(text) => handleChange('location', text)} 
        />
        <FormItem 
          label="Job Title" 
          value={localProfile.jobTitle || ''} 
          placeholder="Add Your Job Title" 
          onChangeText={(text) => handleChange('jobTitle', text)} 
        />
        <FormItem 
          label="Focused Main Field" 
          value={localProfile.mainField || ''} 
          placeholder="Main Field You Focus on" 
          onChangeText={(text) => handleChange('mainField', text)} />

        <InterestSelector
          interests={localProfile.interests || []}
          toggleInterest={(interest: string) => {
            handleChange('interests', localProfile.interests?.includes(interest)
              ? localProfile.interests.filter((i: string) => i !== interest)
              : [...(localProfile.interests as []), interest]
            );
          }}
        />

        <FormItem label="About Me" value={localProfile.aboutMe || ''} placeholder="Tell the people about yourself" onChangeText={(text) => handleChange('aboutMe', text)} multiline />

        <FormItem 
          label="Work You're Most Proud Of" 
          value={localProfile.proudWork || ''} 
          placeholder="Add URL" 
          onChangeText={(text) => handleChange('proudWork', text)} 
        />

        <SocialMediaInput 
          value={localProfile.portfolio || ''} 
          onChangeText={(text) => handleChange('portfolio', text)} 
        />

        <FormItem 
          label="Languages" 
          value={localProfile.languages?.join(', ') || ''} 
          placeholder="Add Languages" onChangeText={(text) => handleChange('languages', text.split(',').map(lang => lang.trim()))} 
        />
      </EditScrollContainer>
      <ButtonGroup 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0 10px 50px 10px;
`;

const EditScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 10px 25px;
`;

export default EditProfileScreen;