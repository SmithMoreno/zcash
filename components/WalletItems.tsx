import { Router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Icons from "phosphor-react-native";
import { Typo } from "./Typo";
import { WalletType } from "@/types/types";
import { verticalScale } from "@/util/styling";
import { colors, radius, spacingX } from "@/constants/theme";

export const WalletItems = ({
  route,
  item,
  index,
}: {
  route: Router;
  item: WalletType;
  index: number;
}) => {
  const openWallet = () => {
    route.push({
      pathname: "/walletModal",
      params: {
        id: item?.id,
        name: item?.name,
        image: item?.image,
      },
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .springify()
        .damping(13)}
    >
      <TouchableOpacity 
      onPress={openWallet}
      style={styles.container} 
      activeOpacity={0.7}>
        <View style={styles.imageContainer}>
          <Image
            source={item?.image}
            style={{ flex: 1 }}
            contentFit="cover"
            transition={100}
          />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16}> {item?.name}</Typo>
          <Typo size={14} color={colors.neutral400}>
            {" "}
            $ {item?.amount}
          </Typo>
        </View>
        <Icons.CaretRight
          size={verticalScale(20)}
          color={colors.white}
          weight="bold"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  },
});
