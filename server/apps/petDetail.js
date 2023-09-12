import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { protect } from "../Auth/tokenProtected.js";
import { petProfileUpload } from "../utils.js/petProfileUpload.js";
import multer from "multer";

dotenv.config();
const prisma = new PrismaClient();
const petDetail = Router();
const multerUpload = multer({ storage: multer.memoryStorage() });
const avatarUpload = multerUpload.fields([{ name: "avatar" }]);
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

    // // ตรวจสอบว่ามีการอัปโหลดไฟล์ในคำขอหรือไม่
    // if (!req.files || !req.files.file) {
    //   return res
    //     .status(400)
    //     .json({ message: "กรุณาอัปโหลดรูปภาพของสัตว์เลี้ยง" });
    // }

    // // จัดการการอัปโหลดไฟล์ใน req.files.file และกำหนดค่า file เป็น URL ของรูปที่อัปโหลด
    // const file = req.files.file;
    // // โค้ดของคุณสำหรับการอัปโหลดและกำหนดค่า URL ของ image_profile ที่นี่

    // // ตัวอย่างโค้ดสำหรับการอัปโหลดไปยัง Supabase
    // const { data, error } = await supabase.storage
    //   .from("public")
    //   .upload(`profilePet/${file.name}`, file.data);

    // if (error) {
    //   return res.status(500).json({ message: "การอัปโหลดรูปภาพล้มเหลว" });
    // }

    // // กำหนดค่า image_profile เป็น URL ของรูปที่อัปโหลด
    // const image_profile = data.Key;

    // สร้างรายละเอียดของสัตว์เลี้ยงพร้อมกับ image_profile ที่อัปเดต
    const createdPet = await prisma.petDetail.create({
      data: {
        petname,
        image_profile:
          "https://tmfjerhaimntzmwlccgx.supabase.co/storage/v1/object/public/petonweruserprofile/Frame%20427321095.png?t=2023-09-04T06%3A11%3A52.422Z",
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
// owner สามารถดูรายละเอียดสัตว์เลี้ยงรายตัวได้
// owner สามารถดูรายละเอียดสัตว์เลี้ยงรายตัวได้
petDetail.get("/:ownerId/pet/:petId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const petId = req.params.petId;

    // ค้นหาข้อมูลสัตว์เลี้ยงตาม ownerId และ petId
    const pet = await prisma.petDetail.findUnique({
      where: {
        pet_id: petId,
      },
      include: {
        owner: true,
      },
    });

    if (!pet || pet.owner.petowner_id !== ownerId) {
      return res.status(404).json({ message: "ไม่พบรายละเอียดสัตว์เลี้ยง" });
    }

    return res.json({ pet });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการค้นหารายละเอียดสัตว์เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการค้นหารายละเอียดสัตว์เลี้ยง" });
  }
});

// owner สามารถแก้ไขรายละเอียดสัตว์เลี้ยงของตัวเองได้
petDetail.put("/:ownerId/pet/:petId", avatarUpload, async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const petId = req.params.petId;
    const { petname, pettype, breed, sex, age, color, weight, about } =
      req.body;

    // ตรวจสอบว่าพี่เจ้าของสัตว์ที่มีรายละเอียดที่ระบุด้วย ownerId มีอยู่หรือไม่
    const existingDetail = await prisma.petOwnerUser.findUnique({
      where: {
        petowner_id: ownerId,
      },
    });
    if (!existingDetail) {
      return res.status(404).json({ message: "ไม่พบรายละเอียดพี่เลี้ยง" });
    }

    let avatarUrls = null;
    // อัปโหลดรูปภาพโปรไฟล์และรับ URL จาก Supabase
    if (req.files && req.files.avatar) {
      avatarUrls = await petProfileUpload(req.files);
    }
    const updatedDetail = await prisma.petDetail.update({
      where: {
        pet_id: petId,
      },
      data: {
        petname,
        image_profile: avatarUrls,
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

    return res.status(200).json({
      message: "อัพเดทรายละเอียดสัตว์เลี้ยงสำเร็จ",
      petDetail: updatedDetail,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัพเดทรายละเอียดสัตว์เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการอัพเดทรายละเอียดสัตว์เลี้ยง" });
  }
});
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
