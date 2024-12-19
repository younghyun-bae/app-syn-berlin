import React from 'react';
import styled from 'styled-components/native';

import SearchBar from '../../src/components/home/SearchBar';
import EventList from '../../src/components/home/EventList';
import PopularList from '../../src/components/home/PopularList';
import AboutSection from '../../src/components/home/AboutSection';

interface Event {
    id: string;
    image: any;
    description: string;
}

interface PopularItem {
    id: string;
    title: string;
    link?: string;
}

const events: Event[] = [
    { id: '1', image: require('../../assets/images/SYN_lime.png'), description: 'Event Advertisement here' },
    { id: '2', image: require('../../assets/images/SYN_black.png'), description: 'Event 2 Advertisement' },
    { id: '3', image: require('../../assets/images/SYN_lime.png'), description: 'Event 3 Advertisement' },
    { id: '4', image: require('../../assets/images/SYN_black.png'), description: 'Event 4 Advertisement' },
    { id: '5', image: require('../../assets/images/SYN_lime.png'), description: 'Event 5 Advertisement' },
];

const popularItems: PopularItem[] = [
    { id: '1', title: 'Hiring', link: '' },
    { id: '2', title: '1 : 1\nCollaboration' },
    { id: '3', title: 'Threads' },
    { id: '4', title: 'Working\nSpace' },
    { id: '5', title: 'Challenges' },
    { id: '6', title: 'Meetups' },
];

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