import React from 'react';
import { useAuth } from '../../../src/api/hooks/useAuth';
import EditProfileScreen from '../../../src/components/my/editProfile/EditProfileScreen';

const EditProfile = () => {
  const user = useAuth();

  return <EditProfileScreen user={user} />;
};

export default EditProfile;
