import React from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';

interface PopularItem {
    id: string;
    title: string;
    link?: string;
}

interface PopularItemsListProps {
    popularItems: PopularItem[];
}

const PopularItemsList: React.FC<PopularItemsListProps> = ({ popularItems }) => {
    const router = useRouter();

    return (
        <Container>
            {popularItems.map((item, index) => (
                <ItemContainer
                    key={item.id}
                    backgroundColor={index % 2 === 0 ? '#CDDC52' : '#B8ADE0'}
                    onPress={() => router.push('/(tabs)/threads')}
                >
                    <ItemText style={{ letterSpacing: -0.5 }}>{item.title}</ItemText>
                </ItemContainer>
            ))}
        </Container>
    );
};

const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-horizontal: 12px;
`;

const ItemContainer = styled.TouchableOpacity<{ backgroundColor: string }>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    border-radius: 30px;
    margin-bottom: 12px;
    margin-right: 4px;
    padding: 16px;
    height: 80px;
    justify-content: center;
    align-items: center;
    flex-basis: 30%;
`;

const ItemText = styled.Text`
    font-size: 14px;
    font-family: 'DMSans_500Medium';
    color: #232323;
    text-align: center;
`;

export default PopularItemsList;
