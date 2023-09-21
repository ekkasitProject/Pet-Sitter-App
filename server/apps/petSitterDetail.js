import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { protect } from "../Auth/tokenProtected.js";
const prisma = new PrismaClient();
const petSitterDetail = Router();
// petSitterDetail.use(protect);

//get ข้อมูล pettsitterdetail ทั้งหมด

petSitterDetail.get("/alldetail", async (req, res) => {
  try {
    const { pet_type, experience, keywords } = req.query;

    // สร้างตัวแปรสำหรับเก็บเงื่อนไขการกรองข้อมูล
    const filterOptions = {};

    if (pet_type) {
      // ถ้า pet_type เป็น array ใช้ in แทน contains]
      console.log(pet_type);
      const petTypes = pet_type.split(" ");
      console.log(petTypes);
      filterOptions.pet_type = {
        hasSome: petTypes,
      };
    }

    const exp = experience.split("");

    console.log(exp);

    if (exp[0] == "0") {
      filterOptions.OR = [
        {
          experience: {
            gte: "0",
            lte: "2",
          },
        },
      ];
    } else if (exp[0] == "3") {
      filterOptions.OR = [
        {
          experience: {
            gte: "3",
            lte: "5",
          },
        },
      ];
    } else if (exp[0] == "5") {
      filterOptions.OR = [
        {
          experience: {
            gt: "5",
          },
        },
      ];
    }
    if (keywords) {
      filterOptions.OR = [
        {
          petsitter: { username: { contains: keywords, mode: "insensitive" } },
        },
        { pet_sitter_name: { contains: keywords, mode: "insensitive" } },
        { my_place: { contains: keywords, mode: "insensitive" } },
      ];
    }

    // ดึงข้อมูลจากฐานข้อมูลโดยใช้เงื่อนไขการกรองข้อมูล
    const petSitter = await prisma.petSitterDetail.findMany({
      where: filterOptions,
      include: {
        petsitter: true,
      },
    });
    //console.log(petSitter.petsitter.status_update);
    const statusEnable = petSitter.filter(
      (status) => status.petsitter.status_update === true
    );

    // ตรวจสอบว่าพบข้อมูลที่ตรงกับเงื่อนไขหรือไม่
    if (petSitter.length === 0) {
      return res.status(404).json({ message: "ไม่พบข้อมูลที่ตรงกัน" });
    }

    return res.json(statusEnable);
  } catch (error) {
    console.error(
      "เกิดข้อผิดพลาดในการดึงรายละเอียดพี่เลี้ยงสัตว์ทั้งหมด",
      error
    );
    return res.status(500).json({
      message: `เกิดข้อผิดพลาดในการดึงรายละเอียดพี่เลี้ยงสัตว์ทั้งหมด ${error}`,
    });
  }
});

petSitterDetail.get("/:userId", async (req, res) => {
  const petsitterId = req.params.userId;
  try {
    // ดึงข้อมูลของ petsitterdetail และ user จากฐานข้อมูล
    const user = await prisma.petSitterUser.findUnique({
      where: {
        petsitter_id: petsitterId,
      },
      include: {
        petsitterdetail: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบข้อมูลพี่เลี้ยง" });
    }

    return res.json(user);
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูลพี่เลี้ยง", error);
    return res
      .status(500)
      .json({ message: "เกิดข้อผิดพลาดในการค้นหาข้อมูลพี่เลี้ยง" });
  }
});

petSitterDetail.post("/:userId", async (req, res) => {
  try {
    const {
      pet_sitter_name,
      pet_type,
      services,
      my_place,
      image_gallery,
      experience,
    } = req.body;
    const userId = req.params.userId;

    // ตรวจสอบว่า userId มีอยู่จริงในระบบหรือไม่
    const user = await prisma.petSitterUser.findUnique({
      where: {
        petsitter_id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "ไม่พบพี่เลี้ยง" });
    }

    // สร้างรายละเอียดของพี่เลี้ยง
    const createdPet = await prisma.petSitterDetail.create({
      data: {
        pet_sitter_name,
        pet_type,
        services,
        my_place,
        image_gallery: [
          "https://mbxgvfscdghfnvxpfyqi.supabase.co/storage/v1/object/public/default-image/galley-default",
        ],
        experience,
        petsitter: {
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

petSitterDetail.put("/:userId", async (req, res) => {
  const userId = req.params.userId; // ดึง userId จากพารามิเตอร์ URL
  try {
    const {
      pet_sister_name,
      pet_type,
      services,
      my_place,
      image_gallery,
      experience,
    } = req.body;

    // ตรวจสอบว่าพี่เลี้ยงสัตว์ที่มีรายละเอียดที่ระบุด้วย userId มีอยู่หรือไม่
    const existingDetail = await prisma.petSitterDetail.findUnique({
      where: {
        petsitter_id: userId,
      },
    });

    if (!existingDetail) {
      return res.status(404).json({ message: "ไม่พบรายละเอียดพี่เลี้ยง" });
    }

    // อัพเดทรายละเอียดพี่เลี้ยงสัตว์ด้วยข้อมูลใหม่
    const updatedDetail = await prisma.petSitterDetail.update({
      where: {
        petsitter_id: userId,
      },
      data: {
        pet_sister_name,
        pet_type,
        services,
        my_place,
        image_gallery,
        experience,
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
petSitterDetail.delete("/:userId", async (req, res) => {
  const userId = req.params.userId; // ดึง userId จากพารามิเตอร์ URL
  try {
    // ตรวจสอบว่ารายละเอียดพี่เลี้ยงสัตว์ที่ระบุด้วย userId มีอยู่หรือไม่
    const existingDetail = await prisma.petSitterDetail.findUnique({
      where: {
        petsitter_id: userId,
      },
    });

    if (!existingDetail) {
      return res.status(404).json({ message: "ไม่พบรายละเอียดพี่เลี้ยง" });
    }

    // ลบรายละเอียดพี่เลี้ยงสัตว์
    await prisma.petSitterDetail.delete({
      where: {
        petsitter_id: userId,
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

export default petSitterDetail;
