import { firestore } from "@/config/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types/types";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createOrUpdateTrasaction = async (
  transactionData: Partial<TransactionType>
):Promise<ResponseType> => {
  try {
    const { id, type, walletId, amount, image } = transactionData;
    if (!amount || amount <= 0 || !walletId || !type) {
      return { success: false, msg: "Invalid transaction data!" };
    }

    if (id) {
      //todo: update existing transaction
    } else {
      //update wallet for new transaction
      let res = await updateWalletForNewTransation(
        walletId!,
        Number(amount!),
        type as string
      );
      if (!res.success) return res;
    }

    if (image) {
      const imageUploadedRes = await uploadFileToCloudinary(
        image,
        "transactions"
      );
      if (!imageUploadedRes.success) {
        return {
          success: false,
          msg: imageUploadedRes.msg || "Failed to upload receipt",
        };
      }
      transactionData.image = imageUploadedRes.data;
    }
    const transactionRef = id
      ? doc(firestore, "transactions", id)
      : doc(collection(firestore, "transactions"));
    await setDoc(transactionRef, transactionData, { merge: true });

    return {
      success: true,
      data: { ...transactionData, id: transactionRef.id },
    };
  } catch (error: any) {
    console.log("error creatin or updating transaction", error);
    return { success: false, msg: error.message };
  }
};

const updateWalletForNewTransation = async (
  walletId: string,
  amount: number,
  type: string
) => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);
    const walletSnapshot = await getDoc(walletRef);
    if (!walletSnapshot.exists()) {
      console.log("updating wallet for new transaction");
      return { success: false, msg: "Wallet not found" };
    }

    const walletData = walletSnapshot.data() as WalletType;
    if (type === "expense" && walletData.amount! - amount < 0) {
      return {
        success: false,
        msg: "Selected amount dont have enough balance",
      };
    }

    const updateType = type == "income" ? "totalIncome" : "totalExpense";
    const updateWalletAmount =
      type == "income"
        ? Number(walletData.amount) + amount
        : Number(walletData.amount) - amount;

    const updateTotals =
      type == "income"
        ? Number(walletData.totalIncome) + amount
        : Number(walletData.totalExpenses) - amount;

    await updateDoc(walletRef, {
      amount: updateWalletAmount,
      [updateType]: updateTotals,
    });

    return { success: true };
  } catch (error: any) {
    console.log("updating wallet for new transaction", error);
    return { success: false, msg: error.message };
  }
};
