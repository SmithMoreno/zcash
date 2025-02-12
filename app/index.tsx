import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { img } from "@/constants/img";

const SplashScreen = () => {
  const route = useRouter();
  useEffect(() => {
    setTimeout(() => {
      route.replace("/welcome");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={img.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});

export default SplashScreen;
