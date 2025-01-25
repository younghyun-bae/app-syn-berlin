import React from 'react';
import styled from 'styled-components/native';

interface InterestSelectorProps {
  interests: string[];
  toggleInterest: (interest: string) => void;
}

const INTEREST_OPTIONS = ['Collaboration', 'Event', 'Connect', 'Mentorship', 'Co-working Space'];

const InterestSelector = ({ interests, toggleInterest }: InterestSelectorProps) => (
  <InterestContainer>
    <Label>Interests</Label>
    <Separator />
    <InterestOptions>
      {INTEREST_OPTIONS.map((interest, index) => (
        <InterestButton 
          key={index} 
          onPress={() => toggleInterest(interest)}
          selected={interests.includes(interest)}
        >
          <InterestText selected={interests.includes(interest)}>
            {interest}
          </InterestText>
        </InterestButton>
      ))}
    </InterestOptions>
  </InterestContainer>
);

const InterestContainer = styled.View`
  border-radius: 10px;
  background-color: rgba(229, 229, 229, 0.2);
  padding: 10px;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-family: 'DMSans_700Bold';
`;

const Separator = styled.View`
  height: 1px;
  background-color: #d9d9d9;
  margin-bottom: 10px;
`;

const InterestOptions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const InterestButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#232323' : '#fff')};
  border: 1px solid #000;
  border-radius: 25px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const InterestText = styled.Text<{ selected: boolean }>`
  color: ${(props) => (props.selected ? '#fff' : '#232323')};
  font-family: 'DMSans_400Regular';
`;

export default InterestSelector;
