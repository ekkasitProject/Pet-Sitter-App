import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateRandomToken } from "../Auth/genToken.js";
import { protect } from "../Auth/tokenProtected.js";
import { petsitterProfileUpload } from "../utils.js/petsitterProfileUpload.js";
import multer from "multer";
import { deleteOldProfileImage } from "../utils.js/deleteOldProfileImage.js";
import { imageGalleryUpload } from "../utils.js/imageGalleryUpload.js";
const prisma = new PrismaClient();
const petSitterUser = Router();
const multerUpload = multer({ storage: multer.memoryStorage() });
const avatarUpload = multerUpload.fields([
  { name: "avatar" },
  { name: "gallery" },
]);

//Section 1.1: Register pet sitter
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
    const newUser = await prisma.petSitterUser.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
        emailVerificationToken: verificationToken,
        image_profile:
          "https://mbxgvfscdghfnvxpfyqi.supabase.co/storage/v1/object/public/default-image/user-profile?t=2023-09-18T08%3A09%3A15.767Z",
        petsitterdetail: {
          create: {},
        },
        addresses: {
          create: {},
        },
      },
      include: {
        petsitterdetail: true,
        addresses: true,
      },
    });

    // Send an email with the verification link
    const verificationLink = `http://localhost:6543/petSitterUser/verify?token=${verificationToken}`;

    // Send verification email (uncomment and implement according to your email sending mechanism)
    // await sendVerificationEmail(email, verificationLink);

    res.status(200).json({
      message:
        "Registration successful. Please check your email for instructions to verify your identity.",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Registration failed: ${error.message}` });
  }
});

//Section 1.2: verify route after receiving confirmation email
petSitterUser.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    const user = await prisma.petSitterUser.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      return res.status(404).json({ message: "โทเค็นยืนยันไม่ถูกต้อง" });
    }
    await prisma.petSitterUser.update({
      where: { petsitter_id: user.petsitter_id },
      data: { email_verification: true },
    });

    res.status(200).json({ message: "การยืนยันอีเมลสำเร็จ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "การยืนยันอีเมลล้มเหลว" });
  }
});

//Section 2: Login pet sitter
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

    // สร้าง token เปลี่ยนจากuserId เป็นpetsitterId
    const token = jwt.sign(
      { petsitterId: user.petsitter_id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: 3600 }
    );

    // ส่ง token กลับให้ผู้ใช้
    res.json({ message: "เข้าสู่ระบบสำเร็จ", token, user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});

//Section 3: Delete pet sitter by petsitter_id (delete included address and details)
petSitterUser.delete("/:id", protect, async (req, res) => {
  const petsitterId = req.params.id;
  try {
    const deletedUser = await prisma.petSitterUser.delete({
      where: { petsitter_id: petsitterId },
      include: {
        addresses: true,
        petsitterdetail: true,
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

//Section 4: Update profile/detail/address with image by petsitter id
petSitterUser.put("/:id", avatarUpload, async (req, res) => {
  const petsitterId = req.params.id;
  try {
    const {
      username,
      phone,
      id_card_number,
      introduction,
      pet_sitter_name,
      petsitterdetail_id,
      services,
      my_place,
      experience,
      pet_type,
      address_id,
      address_detail,
      district,
      sub_district,
      province,
      post_code,
      oldImageUrl,
    } = req.body;

    const existingUser = await prisma.petSitterUser.findUnique({
      where: { petsitter_id: petsitterId },
    });

    if (!existingUser) {
      return response.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    // const existingIdCardNumber = await prisma.petSitterUser.findUnique({
    //   where: { id_card_number: id_card_number },
    // });

    // if (existingIdCardNumber) {
    //   return response.status(404).json({ message: "รหัสบัตรประชาชนซ้ำ" });
    // }

    //profile img edit
    let avatarUrls = null;
    // อัปโหลดรูปภาพโปรไฟล์และรับ URL จาก Supabase
    if (req.files && req.files.avatar) {
      avatarUrls = await petsitterProfileUpload(req.files);
      // ลบรูปเดิมออกจาก storage ก่อน
      if (oldImageUrl) {
        await deleteOldProfileImage(oldImageUrl);
      }
    }
    //อัปเดตข้อมูล User รวมถึง URL ของรูปภาพโปรไฟล์
    const updateData = {
      username,
      phone,
      id_card_number,
      introduction,
      status_update: true,
      ...(req.files && req.files.avatar
        ? { image_profile: avatarUrls }
        : { image_profile: oldImageUrl }),
    };
    const updatePetSitterDetailData = {
      pet_sitter_name,
      services,
      my_place,
      experience,
      pet_type,
    };

    const updateAddressData = {
      address_detail,
      district,
      sub_district,
      province,
      post_code,
    };

    //img gallery edit

    if (req.files && req.files.gallery) {
      let { gallery } = req.files;

      if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
        return res.status(400).json({ message: "กรุณาอัพโหลดรูปภาพ" });
      }

      if (gallery.length > 10) {
        return res
          .status(400)
          .json({ message: "ไม่สามารถอัพโหลดรูปภาพเกิน 10 รูป" });
      }

      const updatedImages = await Promise.all(
        gallery.slice(0, 10).map(async (file) => {
          const imageUrl = await imageGalleryUpload(file);
          return imageUrl;
        })
      );
      const updateAll = await prisma.petSitterUser.update({
        where: { petsitter_id: petsitterId },
        data: {
          ...updateData,
          petsitterdetail: {
            update: {
              where: { petsitterdetail_id: petsitterdetail_id },
              data: {
                ...updatePetSitterDetailData,
                image_gallery: { set: updatedImages },
              },
            },
          },
          addresses: {
            update: {
              where: { address_id: address_id },
              data: { ...updateAddressData },
            },
          },
        },
        include: {
          petsitterdetail: true,
          addresses: true,
        },
      });
      return res.status(200).json(updateAll);
    } else {
      const updateAll = await prisma.petSitterUser.update({
        where: { petsitter_id: petsitterId },
        data: {
          ...updateData,
          petsitterdetail: {
            update: {
              where: { petsitterdetail_id: petsitterdetail_id },
              data: {
                ...updatePetSitterDetailData,
              },
            },
          },
          addresses: {
            update: {
              where: { address_id: address_id },
              data: { ...updateAddressData },
            },
          },
        },
        include: {
          petsitterdetail: true,
          addresses: true,
        },
      });
      return res.status(200).json(updateAll);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `การอัปเดตข้อมูลล้มเหลว ${error}` });
  }
});

//Section 5: Get data of 1 petsitter by id
petSitterUser.get("/:id", protect, async (req, res) => {
  const petsitterId = req.params.id;
  try {
    const existingUser = await prisma.petSitterUser.findUnique({
      where: { petsitter_id: petsitterId },
    });

    if (!existingUser) {
      return response.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    const petSitterUser = await prisma.petSitterUser.findUnique({
      where: {
        petsitter_id: petsitterId,
      },
      include: {
        petsitterdetail: true,
        addresses: true,
      },
    });
    return res.json({ petSitterUser });
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
});

export default petSitterUser;
