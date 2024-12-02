import React, { useState } from 'react';
import { TextInput, Button, Alert, Image } from 'react-native';
import { useAuth } from '../../../src/api/hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../src/api/firebase';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EditProfileScreen = () => {
    const user = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [location, setLocation] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [interests, setInterests] = useState<string[]>([]);
    // const [images, setImages] = useState<string[]>([]);

    const router = useRouter();

    const handleSave = async () => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { displayName, location, jobTitle, aboutMe, interests });
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
            } else {
                return [...prevInterests, interest];
            }
        });
    };

    // const handleImagePicker = async (index: number) => {
    //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (permissionResult.granted === false) {
    //         Alert.alert("Permission to access camera roll is required!");
    //         return;
    //     }

    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         const newImages = [...images];
    //         newImages[index] = result.assets[0].uri; // 선택한 이미지 URI를 저장
    //         setImages(newImages);
    //     }
    // };

    return (
        <Container>
            {/* <ImageContainer>
                <UploadButton onPress={() => handleImagePicker(0)}>
                    {images[0] ? (
                        <UploadedImage source={{ uri: images[0] }} />
                    ) : (
                        <UploadText>Upload Image 1</UploadText>
                    )}
                </UploadButton>
                <PlusButton>
                    <PlusText>+</PlusText>
                </PlusButton>
                <UploadButton onPress={() => handleImagePicker(1)}>
                    {images[1] ? (
                        <UploadedImage source={{ uri: images[1] }} />
                    ) : (
                        <UploadText>Upload Image 2</UploadText>
                    )}
                </UploadButton>
            </ImageContainer> */}
            <FormItem>
                <Label>Display Name</Label>
                <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} />
            </FormItem>
            <FormItem>
                <Label>Location</Label>
                <TextInput style={styles.input} value={location} onChangeText={setLocation} />
            </FormItem>
            <FormItem>
                <Label>Job Title</Label>
                <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} />
            </FormItem>
            <FormItem>
                <Label>About Me</Label>
                <TextInput style={styles.input} value={aboutMe} onChangeText={setAboutMe} multiline maxLength={500} />
            </FormItem>
            <FormItem>
                <Label>Interests</Label>
                <InterestOptions>
                    {['Collaboration', 'Event', 'Connect', 'Mentorship'].map((interest, index) => (
                        <InterestButton key={index} onPress={() => toggleInterest(interest)}>
                            <InterestText style={{ backgroundColor: interests.includes(interest) ? '#6200ee' : '#eaeaea' }}>
                                {interest}
                            </InterestText>
                        </InterestButton>
                    ))}
                </InterestOptions>
            </FormItem>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancel} color="red" />
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
  background-color: #6200ee; 
  justify-content: center; 
  align-items: center; 
  position: absolute; 
  top: 25%; 
  left: 50%; 
  transform: translate(-50%, -50%);
`;

const PlusText = styled.Text`
  color: white; 
  font-size: 30px; 
`;

const FormItem = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px; 
  font-family: 'DMSans-Bold';
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
  font-family: 'DMSans-Bold';
  padding: 5px;
`;

const styles = {
  input: { 
    borderBottomWidth: 1, 
    paddingBottom: 5,  
    fontSize: 16 
  }
};

export default EditProfileScreen;
