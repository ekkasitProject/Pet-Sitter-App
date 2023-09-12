-- CreateEnum
CREATE TYPE "StatusBookingEnum" AS ENUM ('waiting_for_comfirm', 'in_service', 'success');

-- CreateTable
CREATE TABLE "Booking" (
    "booking_id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "additional_message" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petdetail_id" TEXT NOT NULL,
    "petsitter_id" TEXT NOT NULL,
    "petowner_id" TEXT NOT NULL,
    "status_booking" "StatusBookingEnum" NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("booking_id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_petdetail_id_fkey" FOREIGN KEY ("petdetail_id") REFERENCES "PetDetail"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_petsitter_id_fkey" FOREIGN KEY ("petsitter_id") REFERENCES "PetSitterUser"("petsitter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_petowner_id_fkey" FOREIGN KEY ("petowner_id") REFERENCES "PetOwnerUser"("petowner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
