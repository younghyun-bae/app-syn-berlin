import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { User } from 'firebase/auth';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../api/firebase';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

import FormItem from './FormItem';
import InterestSelector from './InterestSelector';
import ProfileImgUpload from './ProfileImgUpload';
import SocialMediaInput from './SocialMediaInput';
import ButtonGroup from './ButtonGroup';

interface EditProfileScreenProps {
  user: User | null;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user }) => {
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [mainField, setMainField] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [proudWork, setProudWork] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [languages, setLanguages] = useState('');

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || '');
          setLocation(data.location || '');
          setJobTitle(data.jobTitle || '');
          setMainField(data.mainField || '');
          setAboutMe(data.aboutMe || '');
          setInterests(data.interests || []);
          setProudWork(data.proudWork || '');
          setPortfolio(data.portfolio || '');
          setLanguages(data.languages || '');
        }
      });
      return unsubscribe;
    }
  }, [user]);

  const handleSave = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
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
        router.push('/tab_4/myProfile');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  // const toggleInterest = (interest: string) => {
  //   setInterests((prevInterests) => {
  //     if (prevInterests.includes(interest)) {
  //       return prevInterests.filter((i) => i !== interest);
  //     } else if (prevInterests.length < 4) {
  //       return [...prevInterests, interest];
  //     }
  //     return prevInterests;
  //   });
  // };

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

        <ButtonGroup onSave={handleSave} onCancel={() => router.back()} />
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
