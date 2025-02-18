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
import { useAuth } from "@/context/authContext";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/types/types";
import { useRouter } from "expo-router";
import { where, orderBy } from "firebase/firestore";

export const HomeCards = () => {
  const { user } = useAuth();
  const {
    data: wallets,
    loading: walletLoading,
    error,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const getBalance = () => {
    return wallets.reduce(
      (totals: any, item: WalletType) => {
        totals.balance += Number(item.amount);
        totals.income += Number(item.totalIncome);
        totals.expenses += Number(item.totalExpenses);
        return totals;
      },
      { balance: 0, income: 0, expenses: 0 }
    );
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
              Total Balance
            </Typo>
            <Icons.DotsThreeOutline
              size={verticalScale(23)}
              color={colors.black}
              weight="fill"
            />
          </View>
          <Typo color={colors.black} size={30} fontWeight={"bold"}>
            $ {walletLoading ? "0.00" : getBalance()?.balance?.toFixed(2)}
          </Typo>
        </View>
        {/* Total Expenses and Income */}
        <View style={styles.stats}>
          {/* Income */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
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
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo fontWeight={"600"} color={colors.green} size={17}>
              $ {walletLoading ? "0.00" : getBalance()?.income?.toFixed(2)}
              </Typo>
            </View>
          </View>
          {/* Expenses */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
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
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo fontWeight={"600"} color={colors.rose} size={17}>
              $ {walletLoading ? "0.00" : getBalance()?.expenses?.toFixed(2)}
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
