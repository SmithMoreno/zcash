import React, { useRef } from "react";
import Animated from "react-native-reanimated";
import { Link } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { Alert, StyleSheet, View } from "react-native";
import { verticalScale } from "../../util/styling";
import { BackButton } from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import { ButtomCustom } from "@/components/ButtomCustom";
const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSumit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please fill all the fields");
      return;
    }
    console.log("email:", emailRef.current);
    console.log("password:", passwordRef.current);
    console.log('good job');
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*back button*/}
        <BackButton iconSize={28} />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back
          </Typo>
        </View>

        {/*form*/}
        <View style={styles.forn}>
          <Typo size={16} color={colors.textLight} fontWeight={"500"}>
            Login now to wallet all your expenses
          </Typo>
          {/*input*/}
          <Input
            onChangeText={(value) => (emailRef.current = value)}
            placeholder="Email"
            icon={
              <Icons.At
                weight="fill"
                size={verticalScale(26)}
                color={colors.neutral300}
              />
            }
          />
          <Input
            onChangeText={(value) => (passwordRef.current = value)}
            secureTextEntry
            placeholder="Password"
            icon={
              <Icons.Lock
                weight="fill"
                size={verticalScale(26)}
                color={colors.neutral300}
              />
            }
          />
          <Link href={"/"} style={styles.forgotPassword}>
            <Typo size={14} color={colors.text}>
              {" "}
              Forgot Password{" "}
            </Typo>
          </Link>

          <ButtomCustom loading={isLoading} onPress={handleSumit}>
            <Typo size={21} fontWeight={"700"} color={colors.black}>
              Login
            </Typo>
          </ButtomCustom>
        </View>

        {/*footer*/}
        <View style={styles.footer}>
          <Typo size={14} color={colors.text}>
            Don't have an account?
          </Typo>
          <Link href={"/register"} style={styles.footerText}>
            <Typo fontWeight={"700"} size={15} color={colors.primary}>
              Sign Up
            </Typo>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  forn: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    color: colors.text,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
