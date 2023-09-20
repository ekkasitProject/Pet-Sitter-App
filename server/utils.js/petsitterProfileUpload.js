// ไฟล์ supabaseUpload.js
import { supabase } from "./supabase.js";
import { v4 as uuidv4 } from "uuid";

const petsitterProfileUpload = async (files) => {
  let fileUrls = "";
  //let imagePath = "";
  for (let file of files.avatar) {
    try {
      const { data, error } = await supabase.storage
        .from("profileAvatar")
        .upload("petSitter-profile/" + `avatar_${uuidv4()}`, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Error uploading file:", error.message);
        continue;
      }
      //console.log(data);

      const fileUrl = supabase.storage
        .from("profileAvatar")
        .getPublicUrl(data.path);
      //console.log(fileUrl);
      fileUrls = fileUrl.data.publicUrl;
      //imagePath = data.path;
      //console.log(fileUrl);
    } catch (error) {
      console.error("Error processing file:", error.message);
    }
  }

  return fileUrls;
};

export { petsitterProfileUpload };
