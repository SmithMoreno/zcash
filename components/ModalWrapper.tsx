import { Platform, StyleSheet, Text, View } from "react-native";
import { ModalWrapperProps } from "@/types/types";
import { colors, spacingY } from "@/constants/theme";

const isiOS = Platform.OS === "ios";
export const ModalWrapper = ({
  style,
  children,
  bg = colors.neutral800,
}: ModalWrapperProps) => {
  return (
    <View style={[styles.container, { backgroundColor: bg }, style && style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isiOS ? spacingY._15 : 20,
    paddingBottom:isiOS ? spacingY._20 : spacingY._10,
  },
});
