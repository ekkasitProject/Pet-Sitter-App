import { v4 as uuidv4 } from "uuid";

const fileUpload = async (files) => {
  let fileUrls = "";

  for (let file of files.avatar) {
    try {
      const { data, error } = await supabase.storage
        .from("userprofile-storage")
        .upload("profile-upload/" + `avatar_${uuidv4()}`, file.buffer, {
          contentType: file.mimetype,
        });
      if (error) {
        console.error("Error uploading profile  image: " + error.message);
        continue;
      }
      const fileUrl = supabase.storage
        .from("userprofile-storage")
        .getPublicUrl(data.path);

      fileUrls = fileUrl.data.getPublicUrl;
    } catch (error) {
      console.error("Error uploading profile  image: " + error.message);
    }
  }
  return fileUrls;
};

export { fileUpload };
