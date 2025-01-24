import React from 'react';
import ExploreScreen from 'src/components/explore/ExploreScreen';
import { UsersProvider } from 'src/api/context/UsersContext';

const Tab2Screen = () => {
  return (
    <UsersProvider>
      <ExploreScreen />
    </UsersProvider>
  );
};

export default Tab2Screen;