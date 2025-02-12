import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { BackButtonProps } from "@/types/types";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { verticalScale } from "@/util/styling";
import { colors, radius } from "@/constants/theme";

export const BackButton = ({ style, iconSize }: BackButtonProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleBack}>
      <CaretLeft
        size={verticalScale(iconSize ? iconSize : 20)}
        color={colors.white}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius:radius._12,
    borderCurve: "continuous",
    padding:5
  },
});
