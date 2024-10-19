import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';

const LoginScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Welcome, you talent</Text>
            <Text style={{ fontSize: 14 }}>Or continue with Email</Text>
            <TextInput placeholder="Email" style={{ width: 200, height: 40, marginVertical: 10 }} />
            <TextInput placeholder="Password" secureTextEntry style={{ width: 200, height: 40, marginVertical: 10 }} />
            {/* <Link href="/(tabs)"></Link> */}
            <TouchableOpacity onPress={() => router.push('/(tabs)')}>
                <Text>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;