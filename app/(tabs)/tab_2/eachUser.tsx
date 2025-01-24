import React from 'react';
import { UsersProvider } from 'src/api/context/UsersContext';
import EachUserScreen from 'src/components/explore/EachUserScreen';

const EachUser = () => {
  return ( 
    <UsersProvider>
      <EachUserScreen />
    </UsersProvider>
  );
};

export default EachUser;
