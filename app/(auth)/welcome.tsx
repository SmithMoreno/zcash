import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import { img } from "@/constants/img";
import { ButtomCustom } from "@/components/ButtomCustom";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login Button & Image */}
        <View>
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.7}
            style={styles.loginButton}
            accessibilityLabel="Iniciar sesión"
            accessibilityHint="Toca para iniciar sesión en tu cuenta"
          >
            <Typo fontWeight={"500"}>Sign In</Typo>
          </TouchableOpacity>
          <Animated.Image
            entering={FadeIn.duration(2000)}
            resizeMode="contain"
            source={img.cashCoin}
            style={styles.welcomeImage} // Corregido el nombre
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)}
            style={{ alignItems: "center" }}
          >
            <Typo fontWeight={"800"} size={30}>
              Alway take control
            </Typo>
            <Typo fontWeight={"600"} size={20}>
              of your finances
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(2000)
              .delay(1000)
              .springify()
              .damping(12)}
            style={{
              alignItems: "center",
              marginVertical: 2,
              marginTop: spacingY._10,
            }} // Cambiado gap por marginVertical
          >
            <Typo size={17} color={colors.textLight}>
              Finances must be arranged to set a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              lifestyle in future
            </Typo>
          </Animated.View>

          {/* Button */}
          <Animated.View
            entering={FadeInDown.duration(2000)
              .delay(2000)
              .springify()
              .damping(12)}
            style={styles.buttonContainer}
          >
            <ButtomCustom style={{ marginTop: spacingY._20 }}  onPress={handleRegister}>
              <Typo fontWeight={"600"} size={22} color={colors.neutral900}>
                Get Started
              </Typo>
            </ButtomCustom>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: spacingX._7,
  },
  welcomeImage: {
    // Corregido el nombre
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    marginVertical: spacingY._20, // Cambiado gap por marginVertical
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    borderRadius: 40,
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 10,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});

export default Welcome;
