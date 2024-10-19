import { Stack, Tabs } from 'expo-router';

const HomeLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="tab_1"
        options={{
          headerTitle: "Bookmarks",
          title: "Bookmarks"
        }}
      />
      <Tabs.Screen
        name="tab_2"
        options={{
          headerTitle: "Exlore",
          title: "Explore"
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home"
        }}
      />
      <Tabs.Screen
        name="tab_3"
        options={{
          headerTitle: "Chat",
          title: "Chat"
        }}
      />
      <Tabs.Screen
        name="tab_4"
        options={{
          headerTitle: "My Profile",
          title: "My"
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
