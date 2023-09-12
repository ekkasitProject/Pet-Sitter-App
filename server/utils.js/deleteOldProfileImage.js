import { supabase } from "./supabase.js";

const deleteOldProfileImage = async (oldImageUrl) => {
  try {
    const storageResponse = await supabase.storage
      .from("profileAvatar")
      .remove([oldImageUrl]); // ใช้ URL ของรูปภาพเดิม

    if (storageResponse.error) {
      console.error("Error deleting old profile image:", storageResponse.error);
    } else {
      console.log("Old profile image deleted successfully.");
    }
  } catch (error) {
    console.error("Error deleting old profile image:", error.message);
  }
};

export { deleteOldProfileImage };
