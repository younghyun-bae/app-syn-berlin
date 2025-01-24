import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, ImageBackground, Pressable } from 'react-native';
import { useUsers } from 'src/api/context/UsersContext';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

const ExploreScreen: React.FC = () => {
  const { users } = useUsers().state;
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handlePressIn = (uid: string) => {
    setSelectedUser(uid);
  };

  const handlePressOut = () => {
    setSelectedUser(null);
  };

  return (
    <ExploreContainer>
      <FlatList
        data={users}
        numColumns={2}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <Pressable
            style={styles.userCard}
            onPress={() => router.push(`/tab_2/eachUser?uid=${item.uid}`)}
            onPressIn={() => handlePressIn(item.uid)}
            onPressOut={handlePressOut}
          >
            <ImageBackground
              source={{ uri: item.profilePic }} // should be implemented
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              {selectedUser === item.uid && (
                <AboutMeContainer>
                  <AboutMeText numberOfLines={12} ellipsizeMode="tail">
                    {item.aboutMe}
                  </AboutMeText>
                </AboutMeContainer>
              )}
              <TitleContainer isPressed={selectedUser === item.uid}>
                <UserName>{item.displayName}</UserName>
                <JobTitle>{item.jobTitle}</JobTitle>
              </TitleContainer>
            </ImageBackground>
          </Pressable>
        )}
      />
    </ExploreContainer>
  );
};

const ExploreContainer = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #e2e2e2;
`;

const TitleContainer = styled.View<{ isPressed: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.isPressed ? 'rgba(144, 130, 195, 0.7)' : 'rgba(255, 255, 255, 0.8)'};
  padding: 4px;
  align-items: center;
`;

const AboutMeContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 37px;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 6px;
`;

const UserName = styled.Text`
  font-family: 'DMSans_700Bold';
  font-size: 12px;
  color: #232323;
  text-align: center;
`;

const JobTitle = styled.Text`
  font-family: 'DMSans_500Medium';
  font-size: 10px;
  color: #232323;
  text-align: center;
`;

const AboutMeText = styled.Text`
  font-family: 'DMSans_300Regular';
  font-size: 11px;
  color: #232323;
  text-align: center;
  padding: 7px;
`;

const styles = StyleSheet.create({
  userCard: {
    flex: 0.5,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20,
  },
});

export default ExploreScreen;