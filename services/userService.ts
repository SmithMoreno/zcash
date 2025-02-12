import { doc, updateDoc } from "firebase/firestore";
import { ResponseType, UserDataType } from "../types/types";
import { firestore } from "@/config/firebase";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    const userRef = doc(firestore, "users", uid);

    await updateDoc(userRef, updatedData);

    //fetch the updated user data
    if (updatedData.image && updatedData?.image?.uri) {
      const imageUploadedRes = await uploadFileToCloudinary(
        updatedData.image,
        "users"
      );
      if (!imageUploadedRes.success) {
        return {
          success: false,
          msg: imageUploadedRes.msg || "Failed to upload image",
        };
      }
      updatedData.image = imageUploadedRes.data;
    }
    return { success: true, msg: " updated successfully" };
  } catch (error: any) {
    console.log("Error updating user", error.message);
    return { success: false, msg: error?.message };
  }
};
