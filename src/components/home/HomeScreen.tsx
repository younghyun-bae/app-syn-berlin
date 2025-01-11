import React from 'react';
import styled from 'styled-components/native';

import SearchBar from './SearchBar';
import EventList from './EventList';
import PopularList from './PopularList';
import AboutSection from './AboutSection';

import { events, popularItems } from './data';

const HomeScreen = () => {
    return (
        <ScrollViewContainer>
            <SearchBar />
            <Section>
                <SectionTitle>All Events</SectionTitle>
                <EventList events={events} />
            </Section>
            <Section>
                <SectionTitle>Popular</SectionTitle>
                <PopularList popularItems={popularItems} />
            </Section>
            <Section>
                <SectionTitle>About</SectionTitle>
                <AboutSection />
            </Section>
        </ScrollViewContainer>
    );
};

const ScrollViewContainer = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`;

const Section = styled.View`
    margin: 12px;
`;

const SectionTitle = styled.Text`
    font-size: 18px;
    font-family: 'DMSans_700Bold';
    margin: 12px;
`;

export default HomeScreen;