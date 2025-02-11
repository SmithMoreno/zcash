import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CustomButtonProps } from "@/types/types";
import { colors, radius } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import Loading from "./Loading";

export const ButtomCustom = ({
  style,
  onPress,
  loading,
  children,
}: CustomButtonProps) => {
  if (loading) {
    return (
      <View
        style={[
          styles.button,
          style,
          {
            backgroundColor: "transparent",
          },
        ]}
      >
        <Loading />
      </View>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, style]}
    >
      {children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderCurve: "continuous",
    borderRadius: radius._17,
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
