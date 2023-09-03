import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const petDetail = Router();

petDetail.get("/:ownerId/pets", async (req, res) => {
  const ownerId = parseInt(req.params.ownerId); // แปลง ownerId เป็น integer
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

petDetail.post("/:ownerId/create", async (req, res) => {
  try {
    const {
      petname,
      image_profile,
      pettype,
      breed,
      sex,
      age,
      color,
      weight,
      about,
    } = req.body;
    const ownerId = parseInt(req.params.ownerId); // แปลง ownerId เป็น integer

    // ตรวจสอบว่า ownerId มีอยู่จริงในระบบหรือไม่
    const owner = await prisma.petOwnerUser.findUnique({
      where: {
        petowner_id: ownerId,
      },
    });

    if (!owner) {
      return res.status(404).json({ message: "เจ้าของสัตว์เลี้ยงไม่พบ" });
    }

    // สร้างรายละเอียดของสัตว์เลี้ยง
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

export default petDetail;
