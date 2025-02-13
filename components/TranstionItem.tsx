import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { expenseCategories } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import { Typo } from "./Typo";
import { TransactionItemProps } from "@/types/types";

 export const TranstionItem = ({ item, index, handleClick }: TransactionItemProps) => {
  let category = expenseCategories["groceries"];
  const IconsComponent = category.icon;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity
        onPress={() => handleClick(item)}
        activeOpacity={0.7}
        style={styles.row}
      >
        <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
          {IconsComponent && (
            <IconsComponent
              size={verticalScale(25)}
              color={colors.white}
              weight="bold"
            />
          )}
        </View>
        <View style={styles.categorieDes}>
          <Typo size={17} fontWeight={"500"}>
            {category.label}
          </Typo>
          <Typo
            textProps={{ numberOfLines: 1 }}
            size={15}
            color={colors.neutral400}
          >
            wifi payment
          </Typo>
        </View>
        <View style={styles.amoutData}>
          <Typo size={17} color={colors.primary} fontWeight={"500"}>
            + $23
          </Typo>
          <Typo size={13} color={colors.neutral400}>
            2 days ago
          </Typo>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({

  // row uso 
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._12,
    marginBottom: spacingY._12,
    backgroundColor: colors.neutral800,
    padding: spacingX._10,
    paddingHorizontal: spacingY._10,
    borderRadius: radius._17,
  },
  //uso  icon
  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._12,
    borderCurve: "continuous",
  },
  // uso
  categorieDes: {
    flex: 1,
    gap: 2.5,
  },
  // uso
  amoutData: {
    alignItems: "flex-end",
    gap: 3,
  },
});
