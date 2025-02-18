import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typo } from "@/components/Typo";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/authContext";
import * as Icons from "phosphor-react-native";
import { HomeCards } from "@/components/HomeCards";
import { TransactionList } from "@/components/TransactionList";
import { ButtomCustom } from "@/components/ButtomCustom";
import { useRouter } from "expo-router";
import { limit, orderBy, where } from "firebase/firestore";
import useFetchData from "@/hooks/useFetchData";
import { TransactionType } from "@/types/types";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  const constraints = [
    where("uid", "==", user?.uid),
    orderBy("date", "desc"),
    limit(30),
  ];

  const {
    data: recentTransactions,
    loading: transactionLoading,
    error,
  } = useFetchData<TransactionType>(" transactions", constraints);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Typo size={16} color={colors.neutral400}>
              {" "}
              Hello
            </Typo>
            <Typo size={20} fontWeight={"500"}>
              {user?.name}
            </Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon} activeOpacity={0.7}>
            <Icons.MagnifyingGlass
              size={verticalScale(22)}
              color={colors.neutral200}
              weight="bold"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {/* Cards */}
          <View>
            <HomeCards />
          </View>
          <TransactionList
            loading={transactionLoading}
            emptyListMessage="No transactions found"
            data={recentTransactions}
            title="Recent Transactions"
          />
        </ScrollView>
        {/* Floating Button */}

        <ButtomCustom
          style={styles.floatingButton}
          onPress={() => router.push("/transationModal")}
          loading={false}
          children={
            <Icons.Plus
              size={verticalScale(25)}
              color={colors.black}
              weight="bold"
            />
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingY._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30),
  },
  scrollViewStyle: {
    marginTop: spacingY._20,
    marginBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
