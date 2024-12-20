import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../api/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../../api/hooks/useAuth';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
    const user = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");

    const router = useRouter();

    const handleSaveProfile = async () => {
        if (user) {
            try {
                await updateProfile(auth.currentUser!, { displayName });
                await updateDoc(doc(db, "users", user.uid), { displayName });
                console.log("Profile updated successfully");
            } catch (error) {
                console.error("Profile update failed:", error);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('Signed out');
            router.replace('../../login');
            Alert.alert("User signed out", "Please sign in again to use the app.");
        } catch (error) {
            console.error('Logout failed', error);
            Alert.alert("Sign Out Failed", "Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {user ? (
                <>
                    <Text>Welcome, {user.displayName || user.email}. You can modify your display name and sign out.</Text>
                    <TextInput
                        placeholder="Edit Name"
                        value={displayName}
                        onChangeText={setDisplayName}
                        style={{ borderBottomWidth: 1, marginBottom: 16, width: 200 }}
                    />
                    <Button title="Save Profile" onPress={handleSaveProfile} />
                    <TouchableOpacity onPress={handleLogout}>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
};

export default SettingsScreen;