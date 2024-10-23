import styled from 'styled-components/native';
import { useLocalSearchParams } from 'expo-router';

const DetailScreen: React.FC = () => {
    const { itemId } = useLocalSearchParams<{ 
        itemId: string,
    }>();

    return (
        <Container>
            <Title>Detail for Item {itemId}. </Title>
            <Description>Here you can add more details about item {itemId}.</Description>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-color: #fff;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const Description = styled.Text`
    font-size: 16px;
    text-align: center;
`;

export default DetailScreen;
