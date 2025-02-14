import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { ScreenWrapperProps } from "@/types/types";
import { colors } from "@/constants/theme";

const { height } = Dimensions.get("window");
const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS === "ios" ? height * 0.1 : 0;
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop,
          backgroundColor: colors.neutral900,
        },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
