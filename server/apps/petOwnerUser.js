import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();
const petOwnerUser = Router();
// Configuration for Nodemailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "ekkasitprivate@gmail.com",
//     pass: "faggqqokgctujwxa",
//   },
// });

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
          "https://dwnbqmdvggdkkisogmfy.supabase.co/storage/v1/object/public/avatar/Frame%20427321095.png",
      },
    });

    // Send an email with the verification link
    const verificationLink = `http://localhost:4000/petowneruser/verify?token=${verificationToken}`;

    // await transporter.sendMail({
    //   from: "admin@gmail.com",
    //   to: email,
    //   subject: "ยืนยันอีเมล",
    //   html: `คลิกลิงก์เพื่อยืนยันอีเมลของคุณ: <a href="${verificationLink}">คลิ๊ก!!!</a>`,
    // });

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

// Function to generate a random token
function generateRandomToken(length) {
  return crypto.randomBytes(length).toString("hex");
}

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
      { expiresIn: "1h" }
    );

    // ส่ง token กลับให้ผู้ใช้
    res.json({ message: "เข้าสู่ระบบสำเร็จ", token, user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});

petOwnerUser.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id); // แปลงรหัสผู้ใช้เป็นตัวเลข

  try {
    const { username, phone, date_of_birth, id_card_number, image_profile } =
      req.body;

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const existingUser = await prisma.petOwnerUser.findUnique({
      where: { petowner_id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    // สร้างข้อมูลที่จะอัปเดต
    const updateData = {
      username,
      phone,
      date_of_birth,
      id_card_number,
      image_profile,
    };

    // ทำการอัปเดตข้อมูลผู้ใช้
    const updatedUser = await prisma.petOwnerUser.update({
      where: { petowner_id: userId },
      data: updateData,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "การอัปเดตข้อมูลล้มเหลว" });
  }
});

// delete users
petOwnerUser.delete("/:id", async (req, res) => {
  const ownerId = parseInt(req.params.id); // แปลงรหัสเจ้าของสัตว์เลี้ยงเป็นตัวเลข
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
