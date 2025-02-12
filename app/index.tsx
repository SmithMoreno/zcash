import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "@/constants/theme";
import { img } from "@/constants/img";

const SplashScreen = () => {
  const route = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      route.replace("/welcome");
    }, 3000);

    // Limpiar el timeout si el componente se desmonta
    return () => clearTimeout(timer);
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
    width: "80%", // Puedes ajustar el ancho según sea necesario
    aspectRatio: 1,
  },
});

export default SplashScreen;
