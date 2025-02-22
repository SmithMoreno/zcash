import { useState } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { expenseCategories, transactionTypes } from "@/constants/data";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/types/types";
import Input from "@/components/Input";
import { ImageUpload } from "@/components/ImageUpload";
import { orderBy, where } from "firebase/firestore";
import { Platform, Pressable, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { createOrUpdateTrasaction } from "@/services/transationService";

const TransactionModal = () => {
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    data: wallets = [],
    loading: loadingWallets,
    error,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const onDateChange = (event: any, selectedDate: any) => {
    const curreDate = selectedDate || transaction.date;
    setTransaction({ ...transaction, date: curreDate });
    setDatePickerVisibility(Platform.OS === "ios" ? true : false);
  };

  const onSubmit = async () => {
    const { type, amount, description, category, date, walletId, image } =
      transaction;

    if (!amount || !date || !walletId) {
      Alert.alert("Transaction", "Please fill all the required fields");
      return;
    }

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

    //todo: include transaction id
    setLoading(true);
    const res = await createOrUpdateTrasaction(transactionData);
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Transaction", res.msg);
    }
  };

  const showAlertDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => console.log("Deleting..."),
        style: "destructive",
      },
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
          {/* Type */}
          <View style={styles.inputContainer}>
            <Typo size={16} color={colors.neutral200}>
              Type
            </Typo>
            <Dropdown
              style={styles.dropdownContainer}
              activeColor={colors.neutral700}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={transactionTypes}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              value={transaction.type}
              onChange={(item) => {
                setTransaction({ ...transaction, type: item.value });
              }}
            />
          </View>

          {/* Wallet */}
          <View style={styles.inputContainer}>
            <Typo size={16} color={colors.neutral200}>
              Wallet
            </Typo>
            <Dropdown
              style={styles.dropdownContainer}
              placeholderStyle={styles.dropdownPlaceholder}
              placeholder="Select a wallet"
              activeColor={colors.neutral700}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={wallets.map((wallet) => ({
                label: `${wallet?.name}($${wallet?.amount})`,
                value: wallet?.id,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              value={transaction.walletId}
              onChange={(item) => {
                setTransaction({ ...transaction, walletId: item.value || "" });
              }}
            />
          </View>

          {/* Expense Category */}
          {transaction.type === "expense" && (
            <View style={styles.inputContainer}>
              <Typo size={16} color={colors.neutral200}>
                {transaction.type === "expense" ? "category" : "Income"}
              </Typo>
              <Dropdown
                placeholderStyle={styles.dropdownPlaceholder}
                placeholder="Select a category"
                style={styles.dropdownContainer}
                activeColor={colors.neutral700}
                selectedTextStyle={styles.dropdownSelectedText}
                iconStyle={styles.dropdownIcon}
                data={Object.values(expenseCategories)}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                value={transaction.category}
                onChange={(item) => {
                  setTransaction({
                    ...transaction,
                    category: item.value || "",
                  });
                }}
              />
            </View>
          )}

          {/* Date and Time */}
          <View style={styles.inputContainer}>
            <Typo size={16} color={colors.neutral200}>
              Date
            </Typo>
            {!isDatePickerVisible && (
              <Pressable
                onPress={() => setDatePickerVisibility(true)}
                style={styles.dateInput}
              >
                <Typo>{(transaction.date as Date).toLocaleDateString()}</Typo>
              </Pressable>
            )}
            {isDatePickerVisible && (
              <View style={Platform.OS === "ios" && styles.iosDatePicker}>
                <DateTimePicker
                  themeVariant="dark"
                  value={transaction.date as Date}
                  textColor={colors.white}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onDateChange}
                />
                {Platform.OS === "ios" && (
                  <TouchableOpacity
                    style={styles.datePickerButton}
                    activeOpacity={0.7}
                    onPress={() => setDatePickerVisibility(false)}
                  >
                    <Typo fontWeight={"500"} size={16}>
                      Ok
                    </Typo>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* Amount */}
          <View style={styles.inputContainer}>
            <Typo size={16} color={colors.neutral200}>
              Amount
            </Typo>
            <Input
              keyboardType="numeric"
              value={transaction.amount?.toString()}
              onChangeText={(value) => {
                setTransaction({
                  ...transaction,
                  amount: Number(value.replace(/[^0-9]/g, "")),
                });
              }}
            />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <View style={styles.flexRow}>
              <Typo size={16} color={colors.neutral200}>
                Description
              </Typo>
              <Typo size={14} color={colors.neutral500}>
                [optional]
              </Typo>
            </View>
            <Input
              value={transaction.description}
              multiline
              containerStyle={{
                flexDirection: "row",
                height: verticalScale(100),
                alignItems: "flex-start",
                paddingVertical: 15,
              }}
              onChangeText={(value) => {
                setTransaction({
                  ...transaction,
                  description: value,
                });
              }}
            />
          </View>

          {/* Input Image */}
          <View style={[styles.inputContainer, { marginTop: spacingY._10 }]}>
            <View style={styles.flexRow}>
              <Typo color={colors.neutral200} size={16}>
                Receipt
              </Typo>
              <Typo color={colors.neutral500} size={14}>
                [optional]
              </Typo>
            </View>
            <ImageUpload
              file={transaction.image}
              onSelect={(file) => {
                setTransaction({ ...transaction, image: file });
              }}
              onClear={() => {
                setTransaction({ ...transaction, image: null });
              }}
              placeholder="Upload an image"
            />
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
            <Icons.Trash
              size={verticalScale(24)}
              color={colors.white}
              weight="bold"
            />
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

export default TransactionModal;

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
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
  },
  dropdownContainer: {
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  dropdownPlaceholder: {
    color: colors.white,
  },
  dropdownSelectedText: {
    color: colors.white,
    fontSize: verticalScale(14),
  },
  dropdownIcon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
  dropdownItemText: {
    color: colors.white,
  },
  dropdownItemContainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },
  dropdownListContainer: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  dateInput: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._17,
    borderCurve: "continuous",
  },
  iosDatePicker: {},
  datePickerButton: {
    backgroundColor: colors.neutral700,
    borderRadius: radius._15,
    padding: spacingY._5,
    alignSelf: "flex-end",
  },
});
