import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUsers } from 'src/api/context/UsersContext';

import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
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
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found!</Text>
        <Button title="Back to Explore" onPress={() => router.back()} />
      </View>
    );
  }


  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.displayName}>{user.displayName || "N/A"}</Text>
        <ContentText>{user.location || "Unknown"}</ContentText>
        <Text style={styles.jobTitle}>{user.jobTitle || "Not provided"}</Text>
        <ContentText>{user.mainField || "Not specified"}</ContentText>
        <SectionTitle>Interest</SectionTitle>
        <SectionTitle>About Me</SectionTitle>
        <ContentText>{user.aboutMe || "No information available"}</ContentText>
        <SectionTitle>Proud Work</SectionTitle>
        <ContentText>{user.proudWork || "No details"}</ContentText>
        <SectionTitle>Portfolio</SectionTitle>
        <ContentText>{user.portfolio || "Not available"}</ContentText>
        <SectionTitle>Languages</SectionTitle>
        <ContentText>{user.languages || "No data"}</ContentText>
        <TouchableOpacity></TouchableOpacity>
        <Button title="Back to Explore" onPress={() => router.back()} />
      </ScrollView>
      <RequestBtn onPress={() => setModalVisible(true)} testID="request-btn">
        <FontAwesomeIcon icon={faPaperPlane} color="#FFFFFF" size={25} />
      </RequestBtn>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ChatRequestScreen 
            onClose={handleModalClose}
            recieverName={user.displayName}
            eachUserUid={user.uid}
          />
        </View>
      </Modal>
    </>
  );
};

const SectionTitle = styled.Text`
    font-family: 'DMSans_700Bold';
    font-size: 18px;
    color: #232323;
    margin-top: 10px;
`;

const ContentText = styled.Text`
  font-family: 'DMSans_500Medium';
  font-size: 14px;
  color: #5A5A5F;
`;

const RequestBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #232323;
  padding: 15px;
  border-radius: 50px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
});

export default EachUserScreen;
