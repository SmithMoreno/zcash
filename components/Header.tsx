import { StyleSheet, Text, View } from "react-native";
import { Typo } from "./Typo";
import { HeaderProps } from "@/types/types";
import { colors } from "@/constants/theme";

export const Header = ({
  title = "",
  style,
  leftIcon,
  rightIcon,
}: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.letIcons}>{leftIcon}</View>}
      {title && (
        <Typo
          style={{
            width: leftIcon ? "82%" : "100%",
            textAlign: "center",
          }}
          size={22}
          fontWeight={"600"}
        >
          {title}
        </Typo>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  letIcons: {
    alignSelf: "flex-start",
  },
});
