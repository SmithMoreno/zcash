import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Icons from "phosphor-react-native";
import { Typo } from "./Typo";
import { scale, verticalScale } from "@/util/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { img } from "@/constants/img";

export const HomeCards = () => {
  const handledArrowDown = () => {
    console.log("Pressed down");
  };
  const handledArrowUp = () => {
    console.log("Pressed up");
  };
  return (
    <ImageBackground
      source={img.card}
      resizeMode="stretch"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        {/* Total Balance */}
        <View>
          <View style={styles.totalBalance}>
            <Typo color={colors.neutral800} size={17} fontWeight={"500"}>
              {" "}
              Total Balance
            </Typo>
            <Icons.DotsThreeOutline
              size={verticalScale(23)}
              color={colors.black}
              weight="fill"
            />
          </View>
          <Typo color={colors.black} size={30} fontWeight={"bold"}>
            $563283.00
          </Typo>
        </View>
        {/* total  expenses and icome */}
        <View style={styles.stats}>
          {/* income */}
          <View style={{ gap: verticalScale(5) }}>
            <Pressable onPress={handledArrowDown} style={styles.incomeExpense}>
              <View style={styles.statsIcons}>
                <Icons.ArrowDown
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo fontWeight={"500"} color={colors.neutral700} size={17}>
                Income
              </Typo>
            </Pressable>
            <View style={{ alignSelf: "center" }}>
              <Typo fontWeight={"600"} color={colors.green} size={17}>
                {" "}
                $ 2342
              </Typo>
            </View>
          </View>
          {/* expenses */}
          <View style={{ gap: verticalScale(5) }}>
            <Pressable onPress={handledArrowUp} style={styles.incomeExpense}>
              <View style={styles.statsIcons}>
                <Icons.ArrowUp
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo fontWeight={"500"} color={colors.neutral700} size={17}>
                Expenses
              </Typo>
            </Pressable>
            <View style={{ alignSelf: "center" }}>
              <Typo fontWeight={"600"} color={colors.rose} size={17}>
                {" "}
                $ 1234
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: scale(210),
    width: "100%",
  },
  container: {
    height: "87%",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: scale(23),
    padding: spacingX._20,
  },
  totalBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacingY._5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsIcons: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },
});
