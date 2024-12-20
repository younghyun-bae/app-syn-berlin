import React from 'react';
import { useAuth } from '../../../src/api/hooks/useAuth';
import MyProfile from '../../../src/components/my/MyProfile';

const Tab4 = () => {
    const user = useAuth();

    return (
        <MyProfile user={user} />
    );
};

export default Tab4;