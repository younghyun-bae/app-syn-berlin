import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useUsers } from 'src/api/context/UsersContext';

import styled from 'styled-components/native';

import { useRouter } from 'expo-router'; 

const ExploreScreen: React.FC = () => {
  const { users } = useUsers().state;

  const router = useRouter();


  return (
    <ExploreContainer>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          // When it's hover, show AboutMe text
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => router.push(`/tab_2/eachUser?uid=${item.uid}`)}
          >
          {/* Background will be each user's profile pic */}
            <TitleContainer>
              <UserName>{item.displayName}</UserName>
              <JobTitle>{item.jobTitle}</JobTitle>
            </TitleContainer>
          </TouchableOpacity>
        )}
      />
    </ExploreContainer>
  );
};

const ExploreContainer = styled.View`
    flex: 1;
    padding: 16px;
    background-color: '#fff';
`

const TitleContainer = styled.View`
  
`;

const UserName = styled.Text`
  font-family: 'DMSans_700Bold';
  font-size: 16px;
  color: #232323;
`;

const JobTitle = styled.Text`
  font-family: 'DMSans_500Medium';
  font-size: 12px;
  color: #232323;
`;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExploreScreen;
