import { doc, updateDoc } from "firebase/firestore";
import { ResponseType, UserDataType } from "../types/types";
import { firestore } from "@/config/firebase";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
      const userRef = doc(firestore, "users", uid);

    await updateDoc(userRef, updatedData);

    //fetch the updated user data
    return { success: true, msg: " updated successfully" };
  } catch (error: any) {
    console.log("Error updating user", error.message);
    return { success: false, msg: error?.message };
  }
};
