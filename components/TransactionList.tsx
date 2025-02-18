import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Typo } from "./Typo";
import { TransactionListType } from "@/types/types";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import Loading from "./Loading";

import { TranstionItem } from "./TranstionItem";

export const TransactionList = ({
  data,
  title,
  loading,
  emptyListMessage,
}: TransactionListType) => {
  return (
    <View style={styles.container}>
      {title && (
        <Typo size={20} fontWeight={"500"}>
          {title}
        </Typo>
      )}
      <View style={styles.list}>
        <FlashList
          data={data}
          renderItem={({ item, index }) => (
            <TranstionItem item={item} index={index} />
          )}
          estimatedItemSize={60}
        />
      </View>
      {!loading && data?.length === 0 && (
        <Typo
          size={15}
          color={colors.neutral400}
          style={{ textAlign: "center", marginTop: spacingY._15 }}
        >
          {emptyListMessage}
        </Typo>
      )}
      {loading && (
        <View style={{ top: verticalScale(100) }}>
          <Loading />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
  },
  list: {
    minHeight: 3,
  },
});
