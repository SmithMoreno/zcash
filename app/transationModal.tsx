import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/util/styling";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { Typo } from "@/components/Typo";
import { TransactionType } from "@/types/types";
import { ButtomCustom } from "@/components/ButtomCustom";
import { useAuth } from "@/context/authContext";
import { DropdownType } from "@/components/DropdownType";

const TransationModal = () => {
  const { user } = useAuth();
  const [transaction, setTransaction] = useState<TransactionType>({
    type: "",
    amount: 0,
    description: "",
    category: "",
    date: new Date(),
    walletId: "Expense",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const oldTransaction = useLocalSearchParams();

  const onSubmit = async () => {
    const { type, amount, description, category, date, walletId, image } = transaction;

    if (!amount || !date || !walletId || (type === "expense" && !category)) {
      Alert.alert("Transaction", "Please fill all the fields");
      return;
    }

    console.log('good to go')

    let transactionData: TransactionType = {
      type,
      amount,
      description,
      category,
      date,
      walletId,
      image,
      uid: user?.uid,
    };
    console.log('Transaction Data:', transactionData);
  };

  const showAlertDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => console.log("Deleting..."), style: "destructive" },
    ]);
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          style={{ marginBottom: spacingY._15 }}
          leftIcon={<BackButton />}
          title={oldTransaction?.id ? "Update Transaction" : "New Transaction"}
        />
        {/* Formulario */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Type</Typo>
            {/* Dropdown */}
            <DropdownType />
          </View>
        </ScrollView>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        {oldTransaction?.id && !loading && (
          <ButtomCustom
            onPress={showAlertDelete}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Icons.Trash size={verticalScale(24)} color={colors.white} weight="bold" />
          </ButtomCustom>
        )}

        <ButtomCustom loading={loading} style={{ flex: 1 }} onPress={onSubmit}>
          <Typo fontWeight={"700"} color={colors.black}>
            {oldTransaction?.id ? "Update" : "Submit"}
          </Typo>
        </ButtomCustom>
      </View>
    </ModalWrapper>
  );
};

export default TransationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },
  form: {
    gap: spacingY._20,
    paddingVertical: spacingY._15,
    paddingBottom: spacingY._40,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderWidth: 1,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
