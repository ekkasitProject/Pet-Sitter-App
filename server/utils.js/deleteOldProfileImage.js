import { supabase } from "./supabase.js";

const deleteOldProfileImage = async (oldImageUrl) => {
  const fullUrl = oldImageUrl;
  let result;

  const parts = fullUrl.split("profileAvatar/");
  if (parts.length === 2) {
    result = parts[1];
  } else {
    console.error("Invalid URL format");
    return; // หาก URL ไม่ถูกต้องให้หยุดการทำงาน
  }

  try {
    const storageResponse = await supabase.storage
      .from("profileAvatar")
      .remove([result]);
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
