import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../Auth/tokenProtected.js";
const prisma = new PrismaClient();
const petSisterDetail = Router();
petSisterDetail.use(protect);

//get ข้อมูล pettsitterdetail ทั้งหมด
petSisterDetail.get("/", async (req, res) => {
  try {
    const postSitter = await prisma.petSisterDetail.findMany();
    return res.json({ postSitter });
  } catch (error) {
    console.error(
      "เกิดข้อผิดพลาดในการดึงรายละเอียดพี่เลี้ยงสัตว์ทั้งหมด",
      error
    );
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในการดึงรายละเอียดพี่เลี้ยงสัตว์ทั้งหมด",
    });
  }
});

petSisterDetail.get("/:userId/users", async (req, res) => {
  const petsisterId = req.params.userId;
  try {
    const user = await prisma.petSitterUser.findUnique({
      where: {
        petsitter_id: petsisterId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบข้อมูลพี่เลี้ยง" });
    }

    return res.json({ user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูลพี่เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการค้นหาข้อมูลพี่เลี้ยง" });
  }
});

petSisterDetail.post("/:userId/create", async (req, res) => {
  try {
    const { pet_sister_name, pet_type, services, my_place, image_gallery } =
      req.body;
    const userId = req.params.userId;

    // ตรวจสอบว่า userId มีอยู่จริงในระบบหรือไม่
    const user = await prisma.petSitterUser.findUnique({
      where: {
        petsitter_id: userId,
      },
      include: {
        petsisterdetail: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบพี่เลี้ยง" });
    }

    // สร้างรายละเอียดของพี่เลี้ยง
    const createdPet = await prisma.petSisterDetail.create({
      data: {
        pet_sister_name,
        pet_type,
        services,
        my_place,
        image_gallery,
        petsister: {
          connect: {
            petsitter_id: userId,
          },
        },
      },
    });

    return res.status(201).json({
      message: "สร้างรายละเอียดของสัตว์เลี้ยงสำเร็จ",
      petDetail: createdPet,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างรายละเอียดของสัตว์เลี้ยง", error);
    return res.status(500).json({
      message: "เกิดข้อผิดพลาดในการสร้างรายละเอียดของสัตว์เลี้ยง",
    });
  }
});

petSisterDetail.put("/:detailId/update", async (req, res) => {
  const detailId = req.params.detailId; // ดึง detailId จากพารามิเตอร์ URL
  try {
    const { pet_sister_name, pet_type, services, my_place, image_gallery } =
      req.body;

    // ตรวจสอบว่าพี่เลี้ยงสัตว์ที่มีรายละเอียดที่ระบุด้วย detailId มีอยู่หรือไม่
    const existingDetail = await prisma.petSisterDetail.findUnique({
      where: {
        petsisterdetail_id: detailId,
      },
    });

    if (!existingDetail) {
      return res.status(404).json({ message: "ไม่พบรายละเอียดพี่เลี้ยง" });
    }

    // อัพเดทรายละเอียดพี่เลี้ยงสัตว์ด้วยข้อมูลใหม่
    const updatedDetail = await prisma.petSisterDetail.update({
      where: {
        petsisterdetail_id: detailId,
      },
      data: {
        pet_sister_name,
        pet_type,
        services,
        my_place,
        image_gallery,
      },
    });

    return res.status(200).json({
      message: "อัพเดทรายละเอียดพี่เลี้ยงสัตว์สำเร็จ",
      petDetail: updatedDetail,
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัพเดทรายละเอียดพี่เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการอัพเดทรายละเอียดพี่เลี้ยง" });
  }
});

petSisterDetail.delete("/:detailId/delete", async (req, res) => {
  const detailId = req.params.detailId; // ดึง detailId จากพารามิเตอร์ URL
  try {
    // ตรวจสอบว่ารายละเอียดพี่เลี้ยงสัตว์ที่ระบุด้วย detailId มีอยู่หรือไม่
    const existingDetail = await prisma.petSisterDetail.findUnique({
      where: {
        petsisterdetail_id: detailId,
      },
    });

    if (!existingDetail) {
      return res.status(404).json({ message: "ไม่พบรายละเอียดพี่เลี้ยง" });
    }

    // ลบรายละเอียดพี่เลี้ยงสัตว์
    await prisma.petSisterDetail.delete({
      where: {
        petsisterdetail_id: detailId,
      },
    });

    return res.status(200).json({
      message: "ลบรายละเอียดพี่เลี้ยงสำเร็จ",
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบรายละเอียดพี่เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการลบรายละเอียดพี่เลี้ยง" });
  }
});

export default petSisterDetail;
