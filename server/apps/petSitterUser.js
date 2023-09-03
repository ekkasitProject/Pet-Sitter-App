import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();
const petSitterUser = Router();

function generateRandomToken(length) {
  return crypto.randomBytes(length).toString("hex");
}

//Section 1: Register pet sister
petSitterUser.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if the email is already registered
    const existingUser = await prisma.petSitterUser.findUnique({
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
    await prisma.petSitterUser.create({
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
    const verificationLink = `http://localhost:4000/petSitterUser/verify?token=${verificationToken}`;

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
    res.status(500).json({ message: `การลงทะเบียนล้มเหลว ${error}` });
  }
});

//Section 2: Login pet sister
petSitterUser.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้ด้วยอีเมล
    const user = await prisma.petSitterUser.findUnique({
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

//Section 3: Delete pet sister by petsitter_id (delete included address and details)

export default petSitterUser;
