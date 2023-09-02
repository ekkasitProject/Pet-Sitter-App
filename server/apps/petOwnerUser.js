import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const petOwnerUser = Router();

// register
petOwnerUser.post("/register", async (req, res) => {
  try {
    //  รับข้อมูลจาก req.body
    const { username, email, phone, password } = req.body;

    // ตรวจสอบว่ามีผู้ใช้งานอื่นที่ใช้อีเมลเดียวกันหรือไม่
    const existingUser = await prisma.petOwnerUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "อีเมลนี้ถูกใช้งานแล้ว" });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10); // 10 เป็นจำนวนรอบการเข้ารหัส

    await prisma.petOwnerUser.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
      },
    });

    // ส่งข้อความประกาศความสำเร็จกลับไปยังผู้ใช้
    res.status(200).json({ message: "ลงทะเบียนเรียบร้อยและยืนยันอีเมลแล้ว" });
  } catch (error) {
    // หากมีข้อผิดพลาดในการลงทะเบียนหรือส่งอีเมล
    console.error(error);
    res.status(500).json({ message: "มีข้อผิดพลาดในการลงทะเบียนหรือส่งอีเมล" });
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
