import { FlatList } from 'react-native';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';

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

const HomeScreen = () => {
    const router = useRouter();

    const events: Event[] = [
        { id: '1', image: require('../../assets/images/SYN_lime.png'), description: 'Event Advertisement here' },
        { id: '2', image: require('../../assets/images/SYN_black.png'), description: 'Event 2 Advertisement' },
        { id: '3', image: require('../../assets/images/SYN_lime.png'), description: 'Event 3 Advertisement' },
        { id: '4', image: require('../../assets/images/SYN_black.png'), description: 'Event 4 Advertisement' },
        { id: '5', image: require('../../assets/images/SYN_lime.png'), description: 'Event 5 Advertisement' },
    ];

    const popularItems: PopularItem[] = [
        { id: '1', title: 'Hiring', link: '' },
        { id: '2', title: '1 : 1 Collaboration' },
        { id: '3', title: 'Threads' },
        { id: '4', title: 'Working Space' },
        { id: '5', title: 'Challenges' },
        { id: '6', title: 'Meetups' },
    ];

    return (
        <ScrollViewContainer>
            <SearchBar>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={16} color="#232323" style={{ margin: 8 }} />
                <SearchInput
                    placeholder="Search for any talent..."
                    placeholderTextColor="#888"
                />
            </SearchBar>
            <Section>
                <SectionTitle style={{ letterSpacing: -0.5 }}>All Events</SectionTitle>
                <FlatList<Event>
                    data={events}
                    keyExtractor={( item ) => item.id}
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
            </Section>
            <Section>
                <SectionTitle style={{ letterSpacing: -0.5 }}>Popular</SectionTitle>
                <PopularItemsContainer>
                    {popularItems.map((item, index) => (
                        <PopularItemContainer 
                        key={item.id}
                        backgroundColor={index % 2 === 0 ? '#CDDC52' : '#B8ADE0'}
                        onPress={() => router.push(`/detail/${item.id}`)}
                        >
                            <PopularItemText style={{ letterSpacing: -0.5 }}>{item.title}</PopularItemText>  
                        </PopularItemContainer>
                    ))}
                </PopularItemsContainer>
            </Section>
            <Section>
                <SectionTitle style={{ letterSpacing: -0.5 }}>About</SectionTitle>
                <AboutText>
                    SYN BERLIN is a platform for talents based in Berlin to network and collaborate easily. Freelancers, artists, developers, and designers can register their profiles and connect with one another. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis excepturi culpa officiis vitae perspiciatis iusto architecto amet, hic numquam accusantium placeat cum explicabo sit dolores quam sapiente eum alias? Harum.
                </AboutText>
            </Section>
        </ScrollViewContainer>
    );
};

const ScrollViewContainer = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`;

const SearchBar = styled.View`
    flex-direction: row;
    align-items: center;
    border-color: #232323;
    border-width: 1px;
    border-radius: 30px;
    padding: 8px 16px;
    margin: 24px;
`;

const SearchInput = styled.TextInput`
    flex: 1;
    height: 30px;
    color: #232323;
`;

const Section = styled.View`
    margin: 12px;
`;

const SectionTitle = styled.Text`
    font-size: 18px;
    font-family: 'DMSans_700Bold';
    margin: 12px;
`;

const EventList = styled.FlatList`
    margin-top: 12px;
`;

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

const PopularItemsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-horizontal: 12px;
`;

const PopularItemContainer = styled.TouchableOpacity<{ backgroundColor: string }>`
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

const PopularItemText = styled.Text`
    font-size: 14px;
    font-family: 'DMSans_500Medium';
    color: #232323;
    text-align: center;
`;

const AboutText = styled.Text`
    font-size: 14px;
    color: #5A5A5F;
    margin-horizontal: 24px;
    margin-bottom: 30px;
`;



export default HomeScreen;