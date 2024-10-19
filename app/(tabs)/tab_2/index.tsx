import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

const Tab2Screen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>Explore</Text>
            {/* <TouchableOpacity style={{ marginTop: 20 }}>
                <Link href="/login">Get Started</Link>
            </TouchableOpacity> */}
        </View>
    );
};

export default Tab2Screen;