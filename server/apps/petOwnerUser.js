import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
const prisma = new PrismaClient();
const petOwnerUser = Router();
// Configuration for Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ekkasitprivate@gmail.com",
    pass: "faggqqokgctujwxa",
  },
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
      },
    });

    // Send an email with the verification link
    const verificationLink = `http://localhost:4000/petowneruser/verify?token=${verificationToken}`;
    await transporter.sendMail({
      from: "admin@gmail.com",
      to: email,
      subject: "ยืนยันอีเมล",
      html: `คลิกลิงก์เพื่อยืนยันอีเมลของคุณ: <a href="${verificationLink}">กดสิ่ครับรอไร</a>`,
    });

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

    // Mark the email as verified
    await prisma.petOwnerUser.update({
      where: { petowner_id: user.petowner_id },
      data: { email_verification: true }, // Change to email_verification
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

// update profile
petOwnerUser.put("/edit", async (req, res) => {});

// delete users
petOwnerUser.delete("/", async (req, res) => {
  const deleteUser = await prisma.petOwnerUser.deleteMany();
  return res.json(deleteUser);
});

export default petOwnerUser;
