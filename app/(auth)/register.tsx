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
const Register = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSumit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    console.log("email:", emailRef.current);
    console.log("username:", nameRef.current);
    console.log("password:", passwordRef.current);
    console.log("good job");
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*back button*/}
        <BackButton iconSize={28} />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Get Started
          </Typo>
        </View>

        {/*form*/}
        <View style={styles.forn}>
          <Typo size={16} color={colors.textLight} fontWeight={"500"}>
            Create an account to Coins Exchange
          </Typo>
          {/*input*/}
          <Input
            onChangeText={(value) => (nameRef.current = value)}
            placeholder="Name"
            icon={
              <Icons.User
                weight="fill"
                size={verticalScale(26)}
                color={colors.neutral300}
              />
            }
          />
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

          <ButtomCustom loading={isLoading} onPress={handleSumit}>
            <Typo size={21} fontWeight={"700"} color={colors.black}>
              Sign Up
            </Typo>
          </ButtomCustom>
        </View>

        {/*footer*/}
        <View style={styles.footer}>
          <Typo size={14} color={colors.text}>
            Already have an account?
          </Typo>
          <Link href={"/login"} style={styles.footerText}>
            <Typo fontWeight={"700"} size={15} color={colors.primary}>
              Login
            </Typo>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Register;

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
