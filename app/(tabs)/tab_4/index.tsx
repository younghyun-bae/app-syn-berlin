import React, { useState } from 'react';
import { View, Text, Button, TextInput, } from 'react-native';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../src/api/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../../src/api/hooks/useAuth';

const Tab4Screen = () => {
    const user = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");


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
                    <TextInput
                        placeholder="Display Name"
                        value={displayName}
                        onChangeText={setDisplayName}
                        style={{ borderBottomWidth: 1, marginBottom: 16, width: 200 }}
                    />
                    <Button title="Save Profile" onPress={handleSaveProfile} />
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <Text>Loading user data...</Text>
            )}
        </View>
    );
};

export default Tab4Screen;