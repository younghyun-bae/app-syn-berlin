import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, Alert, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useAuth } from '../../../src/api/hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../src/api/firebase';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faExternalLinkAlt, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faInstagram, faGithub, faFacebook, faXTwitter, faBehance } from '@fortawesome/free-brands-svg-icons';
import { Picker } from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';

const EditProfileScreen = () => {
    const user = useAuth();
    
    const [images, setImages] = useState<string[]>([]);

    const [displayName, setDisplayName] = useState(user?.displayName || 'Unknown');
    const [location, setLocation] = useState<string>('');
    const [jobTitle, setJobTitle] = useState<string>('');
    const [mainField, setMainField] = useState<string>('');
    const [aboutMe, setAboutMe] = useState<string>('');
    const [interests, setInterests] = useState<string[]>([]);
    const [proudWork, setProudWork] = useState<string>('');
    const [portfolio, setPortfolio] = useState<string>('');
    const [languages, setLanguages] = useState<string>('');
    const [showWebView, setShowWebView] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
      (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
              const locationData = await Location.getCurrentPositionAsync({});
              setLocation(`${locationData.coords.latitude}, ${locationData.coords.longitude}`);
          } else {
              Alert.alert('Location permission is required to use this feature.');
          }
      })();
  }, []);

    const handleSave = async () => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { displayName, location, jobTitle, mainField, aboutMe, interests, proudWork, portfolio, languages });
            Alert.alert("Profile Updated");
            router.back();
        } else {
            Alert.alert("Error", "User not found");
        }
    };

    const handleCancel = () => {
        router.back();
    };

    const toggleInterest = (interest: string) => {
        setInterests((prevInterests) => {
            if (prevInterests.includes(interest)) {
                return prevInterests.filter(i => i !== interest);
            } else if (prevInterests.length < 4) {
                return [...prevInterests, interest];
            }
            return prevInterests;
        });
    };

    const handleProudWorkPreview = () => {
      if (proudWork) {
          setPreviewUrl(proudWork);
          setShowWebView(true);
      }
  };
  const renderPortfolioIcon = (url: string) => {
    let icon;
    if (url.includes('youtube.com')) {
      icon = faYoutube;
    } else if (url.includes('instagram.com')) {
      icon = faInstagram;
    } else if (url.includes('github.com')) {
      icon = faGithub;
    } else {
      icon = faExternalLinkAlt;
    }
    return (
      <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <FontAwesomeIcon icon={icon} size={30} />
      </TouchableOpacity>
    );
  };

    const handleImagePicker = async (index: number) => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        const newImages = [...images];
        newImages[index] = result.assets[0].uri;
        setImages(newImages);
      }
    };

    return (
      <Container>
        <ScrollView>
          <ImageContainer>
            <UploadButton onPress={() => handleImagePicker(0)}>
              {images[0] ? (
                <UploadedImage source={{ uri: images[0] }} />
              ) : (
                <UploadText>Upload Image 1</UploadText>
              )}
            </UploadButton>
            <TouchableOpacity onPress={() => handleImagePicker(1)}>
              <FontAwesomeIcon icon={faPlus} size={30} />
            </TouchableOpacity>
            <UploadButton onPress={() => handleImagePicker(1)}>
              {images[1] ? (
                <UploadedImage source={{ uri: images[1] }} />
              ) : (
                <UploadText>Upload Image 2</UploadText>
              )}
            </UploadButton>
          </ImageContainer>
          <FormItem>
              <Label>Name</Label>
              <StyledTextInput style={styles.input} value={displayName} onChangeText={setDisplayName} />
          </FormItem>
          <FormItem>
              <Label>Location</Label>
              <TouchableOpacity onPress={() => setLocation('')}>
                <FontAwesomeIcon icon={faLocationCrosshairs} size={24} color='#232323'/>
                <Text>Based in</Text>
              </TouchableOpacity>
              <StyledTextInput style={styles.input} value={location} editable={false} placeholder="Location will be set automatically" />
          </FormItem>
          <FormItem>
              <Label>Job Title</Label>
              <StyledTextInput 
                style={styles.input} 
                value={jobTitle} 
                placeholder='Add Your Job Title'
                onChangeText={setJobTitle} />
          </FormItem>
          <FormItem>
              <Label>Focused Main Field</Label>
              <StyledTextInput 
                style={styles.input} 
                value={mainField} 
                placeholder='Add Your Main Field'
                onChangeText={setMainField} />
          </FormItem>
          <FormItem>
            <InterestContainer>
              <Label>Interests</Label>
              <Separator />
              <InterestOptions>
                  {['Collaboration', 'Event', 'Connect', 'Mentorship', 'Work Together'].map((interest, index) => (
                    <InterestButton key={index} onPress={() => toggleInterest(interest)}>
                      <InterestText style={{ backgroundColor: interests.includes(interest) ? '#9082C3' : '#eaeaea' }}>
                          {interest}
                      </InterestText>
                    </InterestButton>
                  ))}
              </InterestOptions>
            </InterestContainer>
          </FormItem>
          <FormItem>
              <Label>About Me</Label>
              <StyledTextInput 
                style={[styles.input, { height: 100 }]} 
                value={aboutMe} 
                placeholder='Tell the people about yourself'
                onChangeText={setAboutMe} 
                multiline 
                maxLength={500} 
              />
          </FormItem>
          <FormItem>
              <Label>Work the Most Proud Of</Label>
              <StyledTextInput 
                style={styles.input} 
                value={proudWork} 
                placeholder='Add URL'
                onChangeText={setProudWork}
                onEndEditing={handleProudWorkPreview}
              />
          </FormItem>
          <FormItem>
              <Label>Social Media / Portfolio</Label>
              <StyledTextInput 
                style={styles.input} 
                value={portfolio} 
                placeholder='Add URLs'
                onChangeText={setPortfolio} />
              {portfolio && renderPortfolioIcon(portfolio)}
          </FormItem>
          <FormItem>
          <Label>Languages</Label>
            <Picker
                selectedValue={languages}
                onValueChange={(itemValue) => setLanguages(itemValue)}
            >
                <Picker.Item label="Select a language" value="" />
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Spanish" value="Spanish" />
                <Picker.Item label="Korean" value="Korean" />
                <Picker.Item label="German" value="German" />
                <Picker.Item label="French" value="French" />
                <Picker.Item label="Danish" value="Danish" />
                <Picker.Item label="Chinese" value="Chinese" />
            </Picker>
          </FormItem>
          <ButtonContainer>
            <StyledButton onPress={handleSave}>
              <Text>Cancel</Text>
            </StyledButton>
            <StyledButton onPress={handleCancel}>
              <Text>Save</Text>
            </StyledButton>
          </ButtonContainer>
        </ScrollView>
        {showWebView && (
          <WebView
            source={{ uri: previewUrl }}
            style={{ flex: 1 }}
            onLoadEnd={() => setShowWebView(false)}
          />
        )}
      </Container>
    );
};

const Container = styled.View`
  flex: 1; 
  padding: 20px; 
  background-color: #fff;
`;

const ImageContainer = styled.View`
  flex-direction: row; 
  justify-content: center; 
  align-items: center; 
  margin-bottom: 20px;
`;

const UploadButton = styled.TouchableOpacity`
  width: 100px; 
  height: 100px; 
  border: 1px dashed #ccc; 
  border-radius: 10px; 
  justify-content: center; 
  align-items: center; 
  margin: 0 10px;
`;

const UploadedImage = styled(Image)`
  width: 100%; 
  height: 100%; 
  border-radius: 10px; 
`;

const UploadText = styled.Text`
  text-align: center; 
  color: #888;
`;

const PlusButton = styled.View`
  width: 50px; 
  height: 50px; 
  border-radius: 25px; 
  background-color: #5A5A5F; 
  justify-content: center; 
  align-items: center; 
  position: absolute; 
  top: 25%; 
  left: 50%; 
  transform: translate(-50%, -50%);
`;

// const PlusButton = styled(TouchableOpacity)`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
//   background-color: #6200ee;
//   justify-content: center;
//   align-items: center;
//   margin: 0 10px;
// `;

const PlusText = styled.Text`
  color: white; 
  font-size: 30px; 
`;

const FormItem = styled.View`
  margin-bottom: 20px;
`;

const StyledTextInput = styled(TextInput)`
    border-radius: 10px;
    background-color: rgba(229, 229, 229, 0.7); /* E5E5E5 with 70% opacity */
    padding: 10px;
    color: #5A5A5F;
    border: 1px solid transparent;
`;

const Label = styled.Text`
  font-size: 16px; 
  font-family: 'DMSans_700Bold';
`;

const InterestContainer = styled.View`
    border-radius: 10px;
    background-color: rgba(229, 229, 229, 0.2);
    padding: 10px;
`;

const Separator = styled.View`
    height: 1px;
    background-color: #D9D9D9;
    margin-bottom: 10px;
`;

const InterestOptions = styled.View`
  flex-direction: row; 
  flex-wrap: wrap; 
  padding: 10px; 
  border-radius: 30px;
`;

const InterestButton = styled.TouchableOpacity`
  margin: 5px; 
  padding: 5px 10px; 
  border-radius: 20px; 
`;

const InterestText = styled.Text`
  font-family: 'DMSans_500Medium';
  padding: 5px 10px; 
  border-radius: 30px;
`;

const ButtonContainer = styled.View`
  flex-direction: row; 
  justify-content: space-between; 
  margin-top: 20px;
`;

const StyledButton = styled.TouchableOpacity`
  flex: 1; 
  background-color: #5856d6; 
  border-radius: 30px; 
  justify-content: center; 
  align-items: center; 
  padding: 15px; 
  margin: 0 10px;
`;

const styles = {
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
};

export default EditProfileScreen;
