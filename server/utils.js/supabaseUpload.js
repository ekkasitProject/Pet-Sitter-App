//ไฟล์ supabaseUpload.js
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";

// Supabase credentials
const supabaseUrl = "https://tmfjerhaimntzmwlccgx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtZmplcmhhaW1udHptd2xjY2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3NTg2MDMsImV4cCI6MjAwOTMzNDYwM30.YMO0qTUZQWstRg3NE6SYBm2jEegaTez1qzire27-Zzs";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const supabaseUpload = async (files) => {
  const fileUrls = "";

  for (let file of files.avatar) {
    try {
      const { data, error } = await supabase.storage
        .from("petsisterAvatar") // เปลี่ยนเป็นชื่อ bucket ของคุณ
        .upload(
          file.path,
          file.buffer,
          {
            contentType: file.mimetype,
          },
          {
            cacheControl: "3600", // ตั้งค่าแคชไว้ 1 ชั่วโมง (หรือตามต้องการ)
          }
        );

      if (error) {
        console.error("Error uploading file:", error.message);
        continue; // หากเกิดข้อผิดพลาดในการอัพโหลดไฟล์ จะข้ามไฟล์นี้และทำไฟล์ถัดไป
      }

      fileUrls.push({
        url: data.Location,
        publicId: data.Key,
      });

      await fs.unlink(file.path);
    } catch (error) {
      console.error("Error processing file:", error.message);
    }
  }

  return fileUrls;
};

export { supabaseUpload };
