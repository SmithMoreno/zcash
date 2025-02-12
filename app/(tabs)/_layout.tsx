import CustomTabs from "@/components/ui/CustomTabs";
import { AuthProvider } from "@/context/authContext";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <AuthProvider>
      <Tabs
        tabBar={(props) => <CustomTabs {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="wallet" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="staticts" />
      </Tabs>
    </AuthProvider>
  );
};

export default TabsLayout;
