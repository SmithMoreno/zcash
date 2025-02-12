import { AuthProvider } from "@/context/authContext";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <AuthProvider>
      <Tabs>
        <Tabs.Screen name="index" options={{ headerShown: false }} />
        <Tabs.Screen name="wallet" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
        <Tabs.Screen name="settings" options={{ headerShown: false }} />
        <Tabs.Screen name="staticts" options={{ headerShown: false }} />
      </Tabs>
    </AuthProvider>
  );
};

export default TabsLayout;
