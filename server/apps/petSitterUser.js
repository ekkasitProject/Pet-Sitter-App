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
          "https://tmfjerhaimntzmwlccgx.supabase.co/storage/v1/object/public/petonweruserprofile/Frame%20427321095.png?t=2023-09-04T06%3A11%3A52.422Z",
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

//Section 4: Update
petSitterUser.put("/:id", async (req, res) => {
  const petsisterId = req.params.id;
  try {
    const {
      username,
      password,
      email,
      image_profile,
      phone,
      id_card_number,
      experience,
      introduction,
    } = req.body;
    const existingUser = await prisma.petSitterUser.findUnique({
      where: { petsitter_id: petsisterId },
    });
    if (!existingUser) {
      return response.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    const updateData = {
      username,
      password,
      email,
      image_profile,
      phone,
      id_card_number,
      experience,
      introduction,
    };
    const updatePetsisterUserData = await prisma.petSitterUser.update({
      where: { petsitter_id: petsisterId },
      data: updateData,
    });
    return res.status(200).json(updatePetsisterUserData);
  } catch (error) {
    return res.status(500).json({ message: `การอัปเดตข้อมูลล้มเหลว ${error}` });
  }
});

//Section 3: Delete pet sister by petsitter_id (delete included address and details)
petSitterUser.delete("/:id", async (req, res) => {
  const petsisterId = req.params.id;
  try {
    const deletedUser = await prisma.petSitterUser.delete({
      where: { petsitter_id: petsisterId },
      include: {
        addresses: true,
        petsisterdetail: true,
      },
    });
    res
      .status(200)
      .json({ message: "PetSitterUser ถูกลบเรียบร้อยแล้ว", deletedUser });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบ PetSitterUser:", error);
    res
      .status(500)
      .json({ error: `เกิดข้อผิดพลาดในการลบ PetSitterUser ${error}` });
  } finally {
    await prisma.$disconnect();
  }
});

export default petSitterUser;
