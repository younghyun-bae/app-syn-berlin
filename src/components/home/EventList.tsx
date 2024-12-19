import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

interface Event {
    id: string;
    image: any;
    description: string;
}

interface EventListProps {
    events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    return (
        <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            renderItem={({ item }) => (
                <EventItem>
                    <EventImage source={item.image} />
                    <EventDescription>{item.description}</EventDescription>
                </EventItem>
            )}
            style={{ marginTop: 12 }}
        />
    );
};

const EventItem = styled.View`
    margin-right: 13px;
    align-items: center;
`;

const EventImage = styled.Image`
    width: 260px;
    height: 150px;
    resize-mode: cover;
    border-width: 1px;
    border-color: #232323;
    border-radius: 8px;
`;

const EventDescription = styled.Text`
    font-size: 14px;
    text-align: center;
    margin-top: 4px;
    color: #D3D3D4;
`;

export default EventList;
