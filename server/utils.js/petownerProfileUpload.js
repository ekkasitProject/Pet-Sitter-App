// ไฟล์ supabaseUpload.js
import { supabase } from "./supabase.js";
import { v4 as uuidv4 } from "uuid";

const petownerProfileUpload = async (files) => {
  let fileUrls = "";
  for (let file of files.avatar) {
    try {
      const { data, error } = await supabase.storage
        .from("profileAvatar")
        .upload("petOwner-profile/" + `avatar_${uuidv4()}`, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Error uploading file:", error.message);
        continue;
      }

      const fileUrl = supabase.storage
        .from("profileAvatar")
        .getPublicUrl(data.path);

      fileUrls = fileUrl.data.publicUrl;

      console.log(fileUrl);
    } catch (error) {
      console.error("Error processing file:", error.message);
    }
  }

  return fileUrls;
};

export { petownerProfileUpload };
