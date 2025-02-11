import {  Text, TextStyle } from "react-native";
import { colors } from "@/constants/theme";
import { TypoProps } from "@/types/types";
import { verticalScale } from "@/util/styling";

export const Typo = ({
  color = colors.text,
  size = 16,
  fontWeight = "400",
  children,
  style,
  textProps,
}: TypoProps) => {
  const textStyle: TextStyle = {
    color,
    fontWeight,
    fontSize: size ? verticalScale(size) : verticalScale(18),
  };
  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
};


