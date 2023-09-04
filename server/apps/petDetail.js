import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const petDetail = Router();

// const supabaseUrl = "https://tmfjerhaimntzmwlccgx.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
// owner สามารถดูสัตว์เลี้ยงของตัวเองได้
petDetail.get("/:ownerId", async (req, res) => {
  const ownerId = req.params.ownerId;
  try {
    const owner = await prisma.petOwnerUser.findUnique({
      where: {
        petowner_id: ownerId,
      },
      include: {
        pets: true, // รวมข้อมูลสัตว์เลี้ยงที่เป็นของเจ้าของนี้
      },
    });

    if (!owner) {
      return res.status(404).json({ message: "ไม่พบข้อมูลเจ้าของสัตว์เลี้ยง" });
    }

    return res.json({ owner });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูลเจ้าของสัตว์เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการค้นหาข้อมูลเจ้าของสัตว์เลี้ยง" });
  }
});
// owner สามารถสร้างสัตว์เลี้ยงของตัวเองได้
petDetail.post("/:ownerId", async (req, res) => {
  try {
    const { petname, pettype, breed, sex, age, color, weight, about } =
      req.body;
    const ownerId = req.params.ownerId;

    // ตรวจสอบว่า ownerId มีอยู่จริงในระบบหรือไม่
    const owner = await prisma.petOwnerUser.findUnique({
      where: {
        petowner_id: ownerId,
      },
    });

    if (!owner) {
      return res.status(404).json({ message: "เจ้าของสัตว์เลี้ยงไม่พบ" });
    }

    // ตรวจสอบว่ามีการอัปโหลดไฟล์ในคำขอหรือไม่
    if (!req.files || !req.files.file) {
      return res
        .status(400)
        .json({ message: "กรุณาอัปโหลดรูปภาพของสัตว์เลี้ยง" });
    }

    // จัดการการอัปโหลดไฟล์ใน req.files.file และกำหนดค่า file เป็น URL ของรูปที่อัปโหลด
    const file = req.files.file;
    // โค้ดของคุณสำหรับการอัปโหลดและกำหนดค่า URL ของ image_profile ที่นี่

    // ตัวอย่างโค้ดสำหรับการอัปโหลดไปยัง Supabase
    const { data, error } = await supabase.storage
      .from("public")
      .upload(`profilePet/${file.name}`, file.data);

    if (error) {
      return res.status(500).json({ message: "การอัปโหลดรูปภาพล้มเหลว" });
    }

    // กำหนดค่า image_profile เป็น URL ของรูปที่อัปโหลด
    const image_profile = data.Key;

    // สร้างรายละเอียดของสัตว์เลี้ยงพร้อมกับ image_profile ที่อัปเดต
    const createdPet = await prisma.petDetail.create({
      data: {
        petname,
        image_profile,
        pettype,
        breed,
        sex,
        age,
        color,
        weight,
        about,
        owner: {
          connect: {
            petowner_id: ownerId,
          },
        },
      },
    });

    return res.status(201).json({
      message: "สร้างรายละเอียดของสัตว์เลี้ยงสำเร็จ",
      pet: createdPet,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างรายละเอียดของสัตว์เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการสร้างรายละเอียดของสัตว์เลี้ยง" });
  }
});

// owner สามารถแก้ไขรายละเอียดสัตว์เลี้ยงของตัวเองได้
petDetail.put("/:ownerId", async (req, res) => {});
// owner สามารถลบสัตว์เลี้ยงของตัวเองได้
petDetail.delete("/:ownerId/pet/:petId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const petId = req.params.petId;

    // Check if the owner exists
    const owner = await prisma.petOwnerUser.findUnique({
      where: {
        petowner_id: ownerId,
      },
    });

    if (!owner) {
      return res.status(404).json({ message: "เจ้าของสัตว์เลี้ยงไม่พบ" });
    }

    // Delete the pet
    await prisma.petDetail.delete({
      where: {
        pet_id: petId,
      },
    });

    return res.json({ message: "ลบสัตว์เลี้ยงสำเร็จ" });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบสัตว์เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการลบสัตว์เลี้ยง" });
  }
});

export default petDetail;
