import React, { useRef } from "react";
import { Alert, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Animated from "react-native-reanimated";
import { Link } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "../../util/styling";
import { BackButton } from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";
import { ButtomCustom } from "@/components/ButtomCustom";
import { useAuth } from "@/context/authContext";

const Register = () => {
  const { register: registerUser } = useAuth();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(
      emailRef.current,
      passwordRef.current,
      nameRef.current
    );
    setIsLoading(false);
    if (!res.success) {
      Alert.alert("Sign up", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {/* Back Button */}
            <BackButton iconSize={28} />

            {/* Title */}
            <View style={{ gap: 5, marginTop: spacingY._20 }}>
              <Typo size={30} fontWeight={"800"}>Let's</Typo>
              <Typo size={30} fontWeight={"800"}>Get Started</Typo>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Typo size={16} color={colors.textLight} fontWeight={"500"}>
                Create an account to Coins Exchange
              </Typo>
              <Input
                onChangeText={(value) => (nameRef.current = value)}
                placeholder="Name"
                icon={<Icons.User weight="fill" size={verticalScale(26)} color={colors.neutral300} />}
              />
              <Input
                onChangeText={(value) => (emailRef.current = value)}
                placeholder="Email"
                icon={<Icons.At weight="fill" size={verticalScale(26)} color={colors.neutral300} />}
              />
              <Input
                onChangeText={(value) => (passwordRef.current = value)}
                secureTextEntry
                placeholder="Password"
                icon={<Icons.Lock weight="fill" size={verticalScale(26)} color={colors.neutral300} />}
              />
              <ButtomCustom loading={isLoading} onPress={handleSubmit}>
                <Typo size={21} fontWeight={"700"} color={colors.black}>Sign Up</Typo>
              </ButtomCustom>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Typo size={14} color={colors.text}>Already have an account?</Typo>
              <Link href={"/login"} style={styles.footerText}>
                <Typo fontWeight={"700"} size={15} color={colors.primary}>Login</Typo>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10, // Espacio para el teclado
  },
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: verticalScale(15),
  },
});

export default Register;
