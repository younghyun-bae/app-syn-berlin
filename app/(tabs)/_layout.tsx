import { Stack, Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faGlobe, faHouse } from '@fortawesome/free-solid-svg-icons';

const HomeLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#B8ADE0' }}>
      <Tabs.Screen
        name="tab_1"
        options={{
          headerTitle: "Bookmarks",
          title: "Bookmarks",
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={16} icon={faBookmark} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab_2"
        options={{
          headerTitle: "Explore",
          title: "Explore",
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={16} icon={faGlobe} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={16} icon={faHouse} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab_3"
        options={{
          headerTitle: "Chat",
          title: "Chat",
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={16} icon={faMessage} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab_4"
        options={{
          headerTitle: "My Profile",
          title: "My",
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={16} icon={faUser} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
