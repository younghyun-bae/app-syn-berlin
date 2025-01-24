import React, { useState } from 'react';
import { Button, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUsers } from 'src/api/context/UsersContext';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ChatRequestScreen from './ChatRequestScreen';

const EachUserScreen: React.FC = () => {
  const { uid } = useLocalSearchParams(); 
  const { users } = useUsers().state;
  const user = users.find((u) => u.uid === uid);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleModalClose = () => {
    setModalVisible(false);
    router.back();
  };

  if (!user) {
    return (
      <EachUserContainer>
        <ErrorText>User not found!</ErrorText>
        <Button title="Back to Explore" onPress={() => router.back()} />
      </EachUserContainer>
    );
  }

  return (
    <EachUserContainer>
      <ScrollContainer>
        <ProfileImage source={{ uri: user.profilePic }} />
        <Header>
          <DisplayName>{user.displayName || "N/A"}</DisplayName>
          <LocationContainer>
            <FontAwesomeIcon icon={faLocationDot} color="#232323" size={15} />
            <ContentText>{user.location || "Unknown"}</ContentText>
          </LocationContainer>
        </Header>
        <JobTitle>{user.jobTitle || "Not provided"}</JobTitle>
        <MainField>{user.mainField || "Not specified"}</MainField>
        <SectionContainer>
          <SectionTitle>Interest</SectionTitle>
          <InterestsContainer>
            {user.interests?.length ? user.interests.map((interest, index) => (
              <InterestTag key={index}><InterestTagText>{interest}</InterestTagText></InterestTag>
            )) : <ContentText>No Interests Selected</ContentText>}
          </InterestsContainer>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>About Me</SectionTitle>
          <ContentText>{user.aboutMe || "No information available"}</ContentText>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Proud Work</SectionTitle>
          <ContentText>{user.proudWork || "No details"}</ContentText>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Portfolio</SectionTitle>
          <ContentText>{user.portfolio || "Not available"}</ContentText>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Languages</SectionTitle>
          <ContentText>{user.languages || "No data"}</ContentText>
        </SectionContainer>
        <Button title="Back to Explore" onPress={() => router.back()} />
      </ScrollContainer>
      <RequestBtn onPress={() => setModalVisible(true)} testID="request-btn">
        <FontAwesomeIcon icon={faPaperPlane} color="#FFFFFF" size={25} />
      </RequestBtn>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ChatRequestScreen 
            onClose={handleModalClose}
            recieverName={user.displayName}
            eachUserUid={user.uid}
          />
        </ModalContainer>
      </Modal>
    </EachUserContainer>
  );
};

const EachUserContainer = styled.View`
  flex: 1;
  background-color: #FFF;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 25px;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 30px;
  margin-bottom: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DisplayName = styled.Text`
  font-family: 'DMSans_700Bold';
  font-size: 24px;
  color: #232323;
`;

const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const JobTitle = styled.Text`
  font-family: 'DMSans_500Medium';
  font-size: 18px;
  color: #232323;
  margin-bottom: 5px;
`;

const MainField = styled.Text`
  font-family: 'DMSans_500Medium';
  font-size: 18px;
  color: #232323;
  margin-bottom: 15px;
`;

const SectionContainer = styled.View`
  background-color: rgba(229, 229, 229, 0.2);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.Text`
  font-family: 'DMSans_700Bold';
  font-size: 18px;
  color: #232323;
  margin-bottom: 5px;
`;

const ContentText = styled.Text`
  font-family: 'DMSans_500Medium';
  font-size: 14px;
  color: #5A5A5F;
`;

const InterestsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const InterestTag = styled.View`
  background-color: #FFF;
  border: 1px solid #000;
  border-radius: 25px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const InterestTagText = styled.Text`
  color: #232323;
  font-family: 'DMSans_300Regular';
`;

const RequestBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #232323;
  padding: 15px;
  border-radius: 50px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ErrorText = styled.Text`
  font-size: 18px;
  color: red;
`;

export default EachUserScreen;