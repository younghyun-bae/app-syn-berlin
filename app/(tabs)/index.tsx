import { ScrollView, View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const HomeScreen = () => {
    const events = [
        { id: '1', image: require('../../assets/images/SYN_lime.png'), description: 'Event Advertisement here' },
        { id: '2', image: require('../../assets/images/SYN_black.png'), description: 'Event 2 Advertisement' },
        { id: '3', image: require('../../assets/images/SYN_lime.png'), description: 'Event 3 Advertisement' },
        { id: '4', image: require('../../assets/images/SYN_black.png'), description: 'Event 4 Advertisement' },
        { id: '5', image: require('../../assets/images/SYN_lime.png'), description: 'Event 5 Advertisement' },
    ];

    const popularItems = [
        { id: '1', title: 'Community Threads', link: '' },
        { id: '2', title: '1:1 Collaboration' },
        { id: '3', title: 'Hiring' },
        { id: '4', title: 'Working Space' },
        { id: '5', title: 'Challenges' },
        { id: '6', title: 'Meetups' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchBar}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={16} color="#232323" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for any talent..."
                    placeholderTextColor="#888"
                />
            </View>
            <View style={styles.eventSection}>
                <Text style={styles.sectionTitle}>All Events</Text>
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Image source={item.image} style={styles.eventImage} />
                            <Text style={styles.eventDescription}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.popularSection}>
                <Text style={styles.sectionTitle}>Popular</Text>
                <FlatList
                    data={popularItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.popularItemContainer}>
                            <TouchableOpacity>
                                <Text style={styles.popularItem}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    numColumns={3}
                />
            </View>
            <View style={styles.aboutSection}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.aboutText}>
                    SYN BERLIN is a platform for talents based in Berlin to network and collaborate easily. Freelancers, artists, developers, and designers can register their profiles and connect with one another. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis excepturi culpa officiis vitae perspiciatis iusto architecto amet, hic numquam accusantium placeat cum explicabo sit dolores quam sapiente eum alias? Harum.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#232323',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: '#000',
    },
    eventSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventItem: {
        marginRight: 16,
        alignItems: 'center',
    },
    eventImage: {
        width: 240,
        height: 160,
        resizeMode: 'cover',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    eventDescription: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
    },
    popularSection: {
        marginBottom: 24,
    },
    popularItemContainer: {
        backgroundColor: '#CDDC52',
        borderRadius: 30,
        margin: 8,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        flex: 1,
    },
    popularItem: {
        fontSize: 14,
        color: '#232323',
        textAlign: 'center',
    },
    aboutSection: {
        marginBottom: 24,
    },
    aboutText: {
        fontSize: 14,
        color: '#555',
    },
});


export default HomeScreen;