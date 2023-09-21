import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { generateRandomToken } from "../Auth/genToken.js";
import { protect } from "../Auth/tokenProtected.js";
import multer from "multer";
import { petownerProfileUpload } from "../utils.js/petownerProfileUpload.js";
import { deleteOldProfileImage } from "../utils.js/deleteOldProfileImage.js";
const prisma = new PrismaClient();
const petOwnerUser = Router();

const multerUpload = multer({ storage: multer.memoryStorage() });
const avatarUpload = multerUpload.fields([{ name: "avatar" }]);

petOwnerUser.get("/", protect, async (req, res) => {
  const petOwnerUser = await prisma.petOwnerUser.findMany();
  return res.json(petOwnerUser);
});
petOwnerUser.get("/:id", protect, async (req, res) => {
  const userId = req.params.id;
  const petOwnerUser = await prisma.petOwnerUser.findUnique({
    where: {
      petowner_id: userId,
    },
  });
  return res.json({ petOwnerUser });
});
// register
petOwnerUser.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if the email is already registered
    const existingUser = await prisma.petOwnerUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random verification token
    const verificationToken = generateRandomToken(32);

    // Store the user data and verification token in the database
    await prisma.petOwnerUser.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
        emailVerificationToken: verificationToken,
        image_profile:
          "https://mbxgvfscdghfnvxpfyqi.supabase.co/storage/v1/object/public/default-image/user-profile?t=2023-09-18T08%3A09%3A15.767Z",
      },
    });

    // Send an email with the verification link
    const verificationLink = `http://localhost:6543/petowneruser/verify?token=${verificationToken}`;

    res.status(200).json({
      message:
        "การลงทะเบียนสำเร็จแล้ว กรุณาตรวจสอบอีเมลของคุณสำหรับคำแนะนำในการยืนยันตัวตน",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "การลงทะเบียนล้มเหลว" });
  }
});

// Verification route
petOwnerUser.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user by the verification token
    const user = await prisma.petOwnerUser.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      return res.status(404).json({ message: "โทเค็นยืนยันไม่ถูกต้อง" });
    }

    // แก้คอลัมน์ email_verification เป็น true
    await prisma.petOwnerUser.update({
      where: { petowner_id: user.petowner_id },
      data: { email_verification: true }, // แก้เป็น email_verification
    });

    res.status(200).json({ message: "การยืนยันอีเมลสำเร็จ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "การยืนยันอีเมลล้มเหลว" });
  }
});

// login
petOwnerUser.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้ด้วยอีเมล
    const user = await prisma.petOwnerUser.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "ไม่พบผู้ใช้งานด้วยอีเมลที่ระบุ" });
    }

    // เปรียบเทียบรหัสผ่านที่ป้อนกับรหัสผ่านที่ถูกเก็บในฐานข้อมูล
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });
    }

    // สร้าง token
    const token = jwt.sign(
      { userId: user.petowner_id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: 3600 }
    );

    // ส่ง token กลับให้ผู้ใช้
    res.json({ message: "เข้าสู่ระบบสำเร็จ", token, user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});

// Route สำหรับแก้ไขข้อมูลส่วนตัว
petOwnerUser.put("/:id", protect, avatarUpload, async (req, res) => {
  const userId = req.params.id;
  const oldImageUrl = req.body.oldImageUrl;
  try {
    const { username, phone, date_of_birth, id_card_number } = req.body;

    // ตรวจสอบว่ามีรหัส petowner_id ในฐานข้อมูลหรือไม่
    const existingPetOwner = await prisma.petOwnerUser.findUnique({
      where: { petowner_id: userId },
    });

    if (!existingPetOwner) {
      return res.status(404).json({ message: "ไม่พบรายการที่ต้องการอัปเดต" });
    }

    // แปลงค่า date_of_birth เป็น ISO-8601 DateTime
    const isoDateOfBirth = new Date(date_of_birth).toISOString();

    // ตรวจสอบว่ามีไฟล์รูปภาพที่อัปโหลดหรือไม่
    let avatarUrls = null;
    if (req.files && req.files.avatar) {
      avatarUrls = await petownerProfileUpload(req.files);
      // อัปเดต URL ในฐานข้อมูลของ PetOwnerUser
      let updateData = await prisma.petOwnerUser.update({
        where: { petowner_id: userId },
        data: {
          image_profile: avatarUrls,
          username,
          phone,
          date_of_birth: isoDateOfBirth,
          id_card_number,
        },
      });

      if (oldImageUrl) {
        await deleteOldProfileImage(oldImageUrl);
      }
      res
        .status(200)
        .json({ message: "อัปเดตข้อมูลส่วนตัวและรูปภาพสำเร็จ", updateData });
    } else {
      // ถ้าไม่มีการอัปโหลดรูปภาพ ให้อัปเดตข้อมูลส่วนตัวโดยไม่รวม URL รูปภาพ
      let updateData = await prisma.petOwnerUser.update({
        where: { petowner_id: userId },
        data: {
          username,
          phone,
          date_of_birth: isoDateOfBirth,
          id_card_number,
        },
      });
      res
        .status(200)
        .json({ message: "อัปเดตข้อมูลส่วนตัวสำเร็จ", updateData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "การอัปเดตข้อมูลล้มเหลว" });
  }
});

// delete users
petOwnerUser.delete("/:id", protect, async (req, res) => {
  const ownerId = req.params.id;
  try {
    // ค้นหาเจ้าของสัตว์เลี้ยง
    const owner = await prisma.petOwnerUser.findUnique({
      where: { petowner_id: ownerId },
      include: {
        pets: true, // รวมข้อมูลสัตว์เลี้ยงของเจ้าของ
      },
    });

    if (!owner) {
      return res.status(404).json({ message: "ไม่พบเจ้าของสัตว์เลี้ยง" });
    }

    // ลบสัตว์เลี้ยงของเจ้าของ
    await prisma.petDetail.deleteMany({
      where: { owner_id: ownerId },
    });

    // ลบเจ้าของสัตว์เลี้ยง
    await prisma.petOwnerUser.delete({
      where: { petowner_id: ownerId },
    });

    res
      .status(200)
      .json({ message: "ลบเจ้าของสัตว์เลี้ยงและสัตว์เลี้ยงของเจ้าของสำเร็จ" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "การลบเจ้าของสัตว์เลี้ยงและสัตว์เลี้ยงล้มเหลว" });
  }
});

export default petOwnerUser;
