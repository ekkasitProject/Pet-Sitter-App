import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const booking = Router();

// จอง booking petowneruser /booking/:ownerId
booking.post("/:ownerId", async (req, res) => {
  try {
    // รับ ownerId จากพารามิเตอร์ใน URL
    const ownerId = req.params.ownerId;

    // รับข้อมูลที่ส่งมาจาก pet owner
    const {
      petDetailIds,
      petSitterId,
      datetime,
      startTime,
      endTime,
      additionalMessage,
      totalPrice,
    } = req.body;

    // ตรวจสอบว่า petSitterId มีอยู่ในระบบหรือไม่
    if (!petSitterId) {
      return res.status(400).json({ error: "Pet sitter ID is required." });
    }

    const petSitter = await prisma.petSitterUser.findUnique({
      where: { petsitter_id: petSitterId },
    });

    if (!petSitter) {
      return res.status(404).json({ error: "Pet sitter not found." });
    }

    // สร้าง single booking สำหรับทุก petDetailId ในรายการ
    const booking = await prisma.booking.create({
      data: {
        datetime,
        startTime,
        endTime,
        additional_message: additionalMessage,
        total_price: totalPrice,
        petdetails: petDetailIds,
        petsitter_id: petSitterId,
        petowner_id: ownerId,
        status_booking: "Waiting for confirm",
      },
      include: {
        petowner: {
          select: {
            username: true,
          },
        },
      },
    });

    // อัปเดต status_pet เป็น true สำหรับ PetDetail ที่ถูกจอง
    await prisma.petDetail.updateMany({
      where: {
        pet_id: {
          in: petDetailIds,
        },
      },
      data: {
        status_pet: true, // อัปเดต status_pet เป็น true
      },
    });

    const petDetails = await prisma.petDetail.findMany({
      where: {
        pet_id: {
          in: petDetailIds,
        },
      },
      select: {
        petname: true,
        status_pet: true,
      },
    });

    const petnames = petDetails.map((petDetail) => ({
      petname: petDetail.petname,
      status_pet: petDetail.status_pet,
    }));
    const username = booking.petowner.username;

    const response = {
      booking: {
        ...booking,
        petdetails: petnames,
        petowner: username,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Error creating booking." });
  }
});
// ดูรายละเอียดการจอง ของ petowneruser ตัวเอง /booking/:ownerId
booking.get("/petowner/:ownerId", async (req, res) => {
  try {
    // รับ ownerId จากพารามิเตอร์ใน URL
    const ownerId = req.params.ownerId;

    // ค้นหารายการจองที่เกี่ยวข้องกับ ownerId และรวมข้อมูลของ petsitteruser และ petsitterDetail
    const bookings = await prisma.booking.findMany({
      where: {
        petowner_id: ownerId,
      },
      include: {
        petsitter: {
          include: {
            petsitterdetail: true,
          },
        },
      },
      orderBy: {
        datetime: "asc",
      },
    });

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "No bookings found for this pet owner." });
    }
    const bookingDetails = await Promise.all(
      bookings.map(async (booking) => {
        const petDetails = await prisma.petDetail.findMany({
          where: {
            pet_id: {
              in: booking.petdetails,
            },
          },
          select: {
            pet_id: true,
            petname: true,
          },
        });

        // Map pet_id to petname for each booking
        const petnames = booking.petdetails.map((petId) => {
          const matchingPetDetail = petDetails.find(
            (petDetail) => petDetail.pet_id === petId
          );
          return matchingPetDetail ? matchingPetDetail.petname : null;
        });

        return {
          booking_id: booking.booking_id,
          datetime: booking.datetime,
          startTime: booking.startTime,
          endTime: booking.endTime,
          additional_message: booking.additional_message,
          total_price: booking.total_price,
          status_booking: booking.status_booking,
          petname: petnames,
          petSitter: {
            username: booking.petsitter.username,
            petSitterDetail: booking.petsitter.petsitterdetail,
          },
        };
      })
    );

    res.status(200).json({ bookings: bookingDetails });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Error fetching bookings." });
  }
});

// ดูรายละเอียดการจอง ของ petowneruser ด้วย bookingId
booking.get("/petowner/:ownerId/:bookingId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const bookingId = req.params.bookingId;

    // Check if the booking with the specified bookingId belongs to the pet owner with ownerId
    const booking = await prisma.booking.findUnique({
      where: {
        booking_id: bookingId,
        petowner_id: ownerId,
      },
      include: {
        petsitter: {
          include: {
            petsitterdetail: true,
          },
        },
      },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ error: "Booking not found for this pet owner." });
    }

    // Fetch petdetails for the booking
    const petDetails = await prisma.petDetail.findMany({
      where: {
        pet_id: {
          in: booking.petdetails,
        },
      },
      select: {
        pet_id: true,
        petname: true,
      },
    });

    // Replace pet_id values with petname values in the booking
    const bookingWithPetnames = {
      ...booking,
      petdetails: petDetails.map((petDetail) => petDetail.petname),
    };

    res.status(200).json({ booking: bookingWithPetnames });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ error: "Error fetching booking details." });
  }
});

// ดูรายละเอียดการจอง petowneruser ของ petsitteruser /booking/:sitterId
booking.get("/petsitter/:sitterId", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;

    // Find all bookings associated with the specified sitterId
    const bookings = await prisma.booking.findMany({
      where: {
        petsitter_id: sitterId,
      },
      include: {
        petowner: true,
      },
      orderBy: {
        datetime: "asc", // จัดเรียงตาม datetime ในลักษณะตรงกันข้าม (ascending)
      },
    });

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "No bookings found for this petsitter." });
    }

    // Map the booking data and fetch associated pet details
    const formattedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const petDetails = await prisma.petDetail.findMany({
          where: {
            pet_id: {
              in: booking.petdetails,
            },
          },
        });

        return {
          booking_id: booking.booking_id,
          datetime: booking.datetime,
          startTime: booking.startTime,
          endTime: booking.endTime,
          additional_message: booking.additional_message,
          total_price: booking.total_price,
          status_booking: booking.status_booking,
          petowner: booking.petowner,
          petdetails: petDetails,
          transaction_no: booking.transaction_no,
        };
      })
    );

    res.status(200).json({ bookings: formattedBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Error fetching bookings." });
  }
});

// petsitter update status_bookings
booking.put("/petsitter/:sitterId/cancel", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;
    const { bookingId } = req.body;
    const booking = await prisma.booking.findUnique({
      where: {
        booking_id: bookingId,
        petsitter_id: sitterId,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    const currentDatetime = new Date();
    const bookingEndTime = new Date(booking.endTime);
    if (currentDatetime >= bookingEndTime) {
      // อัปเดต status_pet เป็น false เมื่อ petsitter ไม่กดยืนยันจนเลยเวลาเสร็จสิ้นการบริการ
      await prisma.petDetail.updateMany({
        where: {
          pet_id: {
            in: booking.petdetails, // ใช้ petdetails จาก booking
          },
        },
        data: {
          status_pet: false, // อัปเดต status_pet เป็น false
        },
      });

      const updatedBooking = await prisma.booking.update({
        where: { booking_id: bookingId },
        data: {
          status_booking: "Canceled",
        },
      });

      res.status(200).json({
        message: "Booking marked as 'canceled'.",
        updatedBooking,
      });
    }

    // อัปเดต status_pet เป็น false เมื่อ petsitter reject การจอง
    await prisma.petDetail.updateMany({
      where: {
        pet_id: {
          in: booking.petdetails, // ใช้ petdetails จาก booking
        },
      },
      data: {
        status_pet: false, // อัปเดต status_pet เป็น false
      },
    });

    const updatedBooking = await prisma.booking.update({
      where: { booking_id: bookingId },
      data: {
        status_booking: "Canceled",
      },
    });

    res.status(200).json({
      message: "Booking rejected and status updated to canceled.",
      updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Error updating booking status." });
  }
});
booking.put("/petsitter/:sitterId/confirm", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;
    const { bookingId } = req.body;
    const booking = await prisma.booking.findUnique({
      where: {
        booking_id: bookingId,
        petsitter_id: sitterId,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    const updatedBooking = await prisma.booking.update({
      where: { booking_id: bookingId },
      data: {
        status_booking: "Waiting for service",
      },
    });

    res.status(200).json({
      message: "Booking confirmed and status updated to waiting for service.",
      updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Error updating booking status." });
  }
});

booking.put("/petsitter/:sitterId/in-service", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;
    const { bookingId } = req.body;
    const booking = await prisma.booking.findUnique({
      where: {
        booking_id: bookingId,
        petsitter_id: sitterId,
        // status_booking: "waiting in service",
      },
    });

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found or not in 'waiting in service' status.",
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: { booking_id: bookingId },
      data: {
        status_booking: "In service",
      },
    });

    res
      .status(200)
      .json({ message: "Booking marked as 'in service'.", updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Error updating booking status." });
  }
});
booking.put("/petsitter/:sitterId/end-service", async (req, res) => {
  try {
    const sitterId = req.params.sitterId;
    const { bookingId } = req.body;
    const booking = await prisma.booking.findUnique({
      where: {
        booking_id: bookingId,
        petsitter_id: sitterId,
        // status_booking: "in service",
      },
    });
    if (!booking) {
      return res.status(404).json({
        error: "Booking not found or not in 'in service' status.",
      });
    }
    const currentDatetime = new Date();
    const bookingEndTime = new Date(booking.endTime);
    if (currentDatetime >= bookingEndTime) {
      //อัปเดต status_pet เป็น false เมื่อ petsitter เสร็จสิ้นการบริการ
      await prisma.petDetail.updateMany({
        where: {
          pet_id: {
            in: booking.petdetails, // ใช้ petdetails จาก booking
          },
        },
        data: {
          status_pet: false, // อัปเดต status_pet เป็น false
        },
      });

      const updatedBooking = await prisma.booking.update({
        where: { booking_id: bookingId },
        data: {
          status_booking: "Success",
        },
      });

      res.status(200).json({
        message: "Booking marked as 'success'.",
        updatedBooking,
      });
    } else {
      res.status(400).json({
        error:
          "Booking can only be marked as 'success' when the booking time has ended.",
      });
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Error updating booking status." });
  }
});

export default booking;
