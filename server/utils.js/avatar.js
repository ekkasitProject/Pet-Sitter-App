//ไฟล์ avatar.js

import multer from "multer";

// กำหนดการเก็บไฟล์และสร้าง Multer middleware
const multerUpload = multer({
  // กำหนดที่เก็บไฟล์ (ในกรณีนี้ใช้ "public\\files")
  dest: "public\\files",

  // กำหนดชื่อของไฟล์ที่อัปโหลด
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // สร้าง timestamp เพื่อใช้เป็นชื่อไฟล์
    const extension = file.originalname.split(".").pop(); // ดึงนามสกุลไฟล์

    // กำหนดชื่อไฟล์ใหม่โดยใช้ timestamp และนามสกุลไฟล์
    const newFilename = `${timestamp}.${extension}`;
    cb(null, newFilename);
  },
});

// กำหนด Validation rule ของ Key "avatar"
// ที่ส่งมาจาก Client ว่าให้ส่งไฟล์มาได้มากสุด 1 ไฟล์
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 1 }]);

export { avatarUpload };
