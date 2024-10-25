import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../api/firebase';
import { useAuth } from '../../../api/hooks/useAuth';

const Tab4Screen = () => {
    const user = useAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {user ? (
                <>
                    <Text>Welcome, {user.displayName || user.email}</Text>
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
};

export default Tab4Screen;