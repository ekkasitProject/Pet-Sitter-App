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
const avatarUpload = multerUpload.fields([{ name: "avatar" }]);
//Section 1.1: Register pet sister
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
          "https://mbxgvfscdghfnvxpfyqi.supabase.co/storage/v1/object/public/default-image/user-profile?t=2023-09-18T08%3A09%3A15.767Z",
      },
    });

    // Send an email with the verification link
    const verificationLink = `http://localhost:6543/petSitterUser/verify?token=${verificationToken}`;

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
      { userId: user.petsitter_id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: 3600000 }
    );

    // ส่ง token กลับให้ผู้ใช้
    res.json({ message: "เข้าสู่ระบบสำเร็จ", token, user });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});

//Section 3: Delete pet sister by petsitter_id (delete included address and details)
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
  const oldImageUrl = req.body.oldImageUrl;
  //const oldImageGalleyUrl = req.body.oldImageGalleyUrl;
  try {
    const existingUser = await prisma.petSitterUser.findUnique({
      where: { petsitter_id: petsitterId },
    });

    if (!existingUser) {
      return response.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }
    const {
      //full_name,
      phone,
      id_card_number,
      introduction,
      pet_sister_name,
      experience,
      pet_type,
      services,
      my_place,
      address_detail,
      district,
      sub_district,
      province,
      post_code,
    } = req.body;
    // //Profile update
    // const { full_name, phone, id_card_number, introduction } = req.body;

    // //PetSitterDetail update
    // const { pet_sister_name, experience, pet_type, services, my_place } =
    //   req.body.petSitterDetail;

    // //Address update
    // const { address_detail, district, sub_district, province, post_code } =
    //   req.body.address;

    //upload and delete petsitter profile image
    let avatarUrls = null;
    if (req.files && req.files.avatar) {
      avatarUrls = await petsitterProfileUpload(req.files);
    }
    if (oldImageUrl) {
      await deleteOldProfileImage(oldImageUrl);
    }

    //upload and delete images gallery (upload more than one image)
    let imageGalleryUrls = [];
    if (req.files && req.files.imageGallery) {
      avatarUrls = await imageGalleryUpload(req.files);
    }
    // if (oldImageGalleyUrl) {
    //   await deleteOldProfileImage(oldImageGalleyUrl);
    // }

    // Construct the update data for profile
    let updateUserData = {
      //full_name,
      phone,
      id_card_number,
      introduction,
    };

    // Construct the update data for PetSitterDetail
    let updatePetSitterDetailData = {
      pet_sister_name,
      experience,
      pet_type,
      services,
      my_place,
    };

    // Construct the update data for Address
    let updateAddressData = {
      address_detail,
      district,
      sub_district,
      province,
      post_code,
    };

    const updatedData = await prisma.$transaction([
      prisma.petSitterUser.update({
        where: { petsitter_id: petsitterId },
        data: {
          ...updateUserData,
          ...(req.files && req.files.avatar
            ? { image_profile: avatarUrls }
            : {}),
        },
      }),
      prisma.petSitterDetail.update({
        where: { petsitter_id: petsitterId },
        data: {
          ...updatePetSitterDetailData,
          ...(req.files && req.files.imageGallery
            ? { image_gallery: imageGalleryUrls }
            : {}),
        },
      }),
      prisma.address.update({
        where: { petsitter_id: petsitterId },
        data: updateAddressData,
      }),
    ]);

    return res.status(200).json({
      message: "อัปเดตข้อมูลสำเร็จ",
      updatedData,
    });
  } catch (error) {
    return res.status(500).json({ message: `การอัปเดตข้อมูลล้มเหลว ${error}` });
  }
});

//Section 5: Get data of all petsitter
petSitterUser.get("/", protect, async (req, res) => {
  try {
    const petSitterUser = await prisma.petSitterUser.findMany();
    return res.json({ petSitterUser });
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
});

//Section 6: Get data of 1 petsitter by id
petSitterUser.get("/:id", protect, async (req, res) => {
  const petsitterId = req.params.id;
  try {
    const petSitterUser = await prisma.petSitterUser.findUnique({
      where: {
        petsitter_id: petsitterId,
      },
      include: {
        addresses: true,
        petsitterdetail: true,
      },
    });
    return res.json({ petSitterUser });
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
});
export default petSitterUser;
