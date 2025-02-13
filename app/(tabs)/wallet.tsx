import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import { Typo } from "@/components/Typo";
import { useRouter } from "expo-router";

const Wallet = () => {
  const route=useRouter();
  const getBlance = () => {
    return 0;
  };
  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      {/* Balance View */}
      <View style={styles.container}>
        <Animated.View
          entering={FadeIn.duration(1000)}
          style={styles.balanceView}
        >
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight={"500"}>
              ${getBlance()?.toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </Animated.View>
        {/* Wallets */}
        <Animated.View
          entering={FadeInDown.duration(1000)}
          style={styles.wallets}
        >
          {/* header */}
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight={"500"}>
              Wallets
            </Typo>
            <TouchableOpacity
             activeOpacity={0.7}
             onPress={() => route.push("/walletModal")}
             
             >
              <Icons.PlusCircle
                weight="fill"
                color={colors.primary}
                size={verticalScale(30)}
              />
            </TouchableOpacity>
          </View>
          {/* list of wallets */}
          <View style={styles.listStyle}>

          </View>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
