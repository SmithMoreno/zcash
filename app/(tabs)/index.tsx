import { StyleSheet } from "react-native";

import { Typo } from "@/components/Typo";
import { colors } from "@/constants/theme";

import ScreenWrapper from "@/components/ScreenWrapper";

const Home = () => {
  return (
    <ScreenWrapper>
      <Typo>Home</Typo>

      <Typo color={colors.black}>Logout</Typo>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
