import React, { useRef } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
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

const Login = () => {
  const { login: loginUser } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await loginUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    if (!res.success) {
      Alert.alert("Login", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      {/* Oculta el teclado al tocar fuera */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <BackButton iconSize={28} />

              <View style={{ gap: 5, marginTop: spacingY._20 }}>
                <Typo size={30} fontWeight={"800"}>
                  Hey,
                </Typo>
                <Typo size={30} fontWeight={"800"}>
                  Welcome Back
                </Typo>
              </View>

              {/* Formulario */}
              <View style={styles.form}>
                <Typo size={16} color={colors.textLight} fontWeight={"500"}>
                  Login now to wallet all your expenses
                </Typo>

                {/* Inputs */}
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
                    Forgot Password
                  </Typo>
                </Link>

                {/* Botón */}
                <ButtomCustom loading={isLoading} onPress={handleSubmit}>
                  <Typo size={21} fontWeight={"700"} color={colors.black}>
                    Login
                  </Typo>
                </ButtomCustom>
              </View>

              {/* Footer */}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Centra los inputs
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
