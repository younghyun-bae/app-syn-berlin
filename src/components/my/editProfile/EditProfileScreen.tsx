import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/api/firebase';
import { useProfile } from 'src/api/context/ProfileContext';
import { useAuth } from 'src/api/context/AuthContext';

import { useRouter } from 'expo-router';

import FormItem from './FormItem';
import InterestSelector from './InterestSelector';
import ProfileImgUpload from './ProfileImgUpload';
import SocialMediaInput from './SocialMediaInput';
import ButtonGroup from './ButtonGroup';

import styled from 'styled-components/native';

const EditProfileScreen: React.FC = () => {
  const { state, dispatch } = useProfile();
  const { state: authState } = useAuth();
  const { profile } = state;
  const { user } = authState;
  const router = useRouter();

  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [jobTitle, setJobTitle] = useState(profile?.jobTitle || '');
  const [mainField, setMainField] = useState(profile?.mainField || '');
  const [aboutMe, setAboutMe] = useState(profile?.aboutMe || '');
  const [interests, setInterests] = useState<string[]>(profile?.interests || []);
  const [proudWork, setProudWork] = useState(profile?.proudWork || '');
  const [portfolio, setPortfolio] = useState(profile?.portfolio || '');
  const [languages, setLanguages] = useState(profile?.languages || '');

  const handleSave = async () => {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          displayName,
          location,
          jobTitle,
          mainField,
          aboutMe,
          interests,
          proudWork,
          portfolio,
          languages,
        });
        dispatch({
          type: 'UPDATE_PROFILE',
          payload: {
            displayName,
            location,
            jobTitle,
            mainField,
            aboutMe,
            interests,
            proudWork,
            portfolio,
            languages,
          },
        });
        console.log('Profile edited successfully');
        router.push('/tab_4');
      } catch (error) {
        console.error('EditProfileScreen: Error updating profile:', error);
      }
    } else {
      console.log('EditProfileScreen: User is not authenticated');
      
    }
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    router.back();
  };

  return (
    <Container>
      <ScrollView>
        <ProfileImgUpload onUpload={() => {}} />

        <FormItem label="Name" value={displayName} onChangeText={setDisplayName} />
        <FormItem 
          label="Location" 
          value={location} 
          placeholder="Based in"
          onChangeText={setLocation} 
        />
        <FormItem label="Job Title" value={jobTitle} placeholder="Add Your Job Title" onChangeText={setJobTitle} />
        <FormItem label="Focused Main Field" value={mainField} placeholder="Add Your Main Field" onChangeText={setMainField} />

        <InterestSelector interests={interests} toggleInterest={(interest) => {
          setInterests((prev) => {
            return prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest];
          });
        }} />

        <FormItem
          label="About Me"
          value={aboutMe}
          placeholder="Tell the people about yourself"
          onChangeText={setAboutMe}
          multiline
        />

        <FormItem
          label="Work You're Most Proud Of"
          value={proudWork}
          placeholder="Add URL"
          onChangeText={setProudWork}
        />

        <SocialMediaInput value={portfolio} onChangeText={setPortfolio} />

        <FormItem
          label="Languages"
          value={languages}
          placeholder="Add Languages"
          onChangeText={setLanguages}
        />

        <ButtonGroup onSave={handleSave} onCancel={handleCancel} />
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

export default EditProfileScreen;
