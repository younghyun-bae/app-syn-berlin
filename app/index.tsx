import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

const IntroScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/images/SYN_black.png')} />
            <Text style={{ fontSize: 24 }}>Unleash Potential, Connect, and Create in Berlin</Text>
            <TouchableOpacity style={{ marginTop: 20 }}>
                <Link href="/login">Get Started</Link>
            </TouchableOpacity>
        </View>
    );
};

export default IntroScreen;