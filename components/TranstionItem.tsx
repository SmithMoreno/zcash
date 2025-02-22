import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { expenseCategories, incomeCategory } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import { Typo } from "./Typo";
import { TransactionItemProps } from "@/types/types";
import { Timestamp } from "firebase/firestore";

export const TranstionItem = ({ item, index }: TransactionItemProps) => {
  let category =
  item?.type === "income"
    ? incomeCategory
    : item?.category && expenseCategories[item.category] 
      ? expenseCategories[item.category] 
      : { icon: null, label: "Desconocido", bgColor: colors.neutral600 };

  const date = (item?.date as Timestamp).toDate()?.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity activeOpacity={0.7} style={styles.row}>
        <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
          {category.icon && (
            <category.icon
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
            {item?.description}
          </Typo>
        </View>
        <View style={styles.amoutData}>
          <Typo
            fontWeight={"500"}
            color={item?.type == "income" ? colors.primary : colors.rose}
          >
            {`$${item?.type == "income" ? "+$" : "-$"}${item?.amount}`}
          </Typo>
          <Typo size={13} color={colors.neutral400}>
            {date}
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
