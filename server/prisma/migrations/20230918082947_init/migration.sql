-- CreateEnum
CREATE TYPE "StatusBookingEnum" AS ENUM ('waiting_for_comfirm', 'in_service', 'success');

-- CreateTable
CREATE TABLE "PetOwnerUser" (
    "petowner_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "image_profile" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "id_card_number" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "email_verification" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetOwnerUser_pkey" PRIMARY KEY ("petowner_id")
);

-- CreateTable
CREATE TABLE "PetDetail" (
    "pet_id" TEXT NOT NULL,
    "petname" TEXT NOT NULL,
    "image_profile" TEXT NOT NULL,
    "pettype" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "PetDetail_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "PetSitterUser" (
    "petsitter_id" TEXT NOT NULL,
    "image_profile" TEXT,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "id_card_number" TEXT,
    "introduction" TEXT,
    "email_verification" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,

    CONSTRAINT "PetSitterUser_pkey" PRIMARY KEY ("petsitter_id")
);

-- CreateTable
CREATE TABLE "PetSisterDetail" (
    "petsisterdetail_id" TEXT NOT NULL,
    "petsister_id" TEXT NOT NULL,
    "pet_sister_name" TEXT NOT NULL,
    "pet_type" TEXT[],
    "services" TEXT NOT NULL,
    "my_place" TEXT NOT NULL,
    "image_gallery" TEXT[],
    "experience" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetSisterDetail_pkey" PRIMARY KEY ("petsisterdetail_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "petsister_id" TEXT NOT NULL,
    "address_detail" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "sub_district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "post_code" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "PetOwnerUser_email_key" ON "PetOwnerUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PetSitterUser_email_key" ON "PetSitterUser"("email");

-- AddForeignKey
ALTER TABLE "PetDetail" ADD CONSTRAINT "PetDetail_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "PetOwnerUser"("petowner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetSisterDetail" ADD CONSTRAINT "PetSisterDetail_petsister_id_fkey" FOREIGN KEY ("petsister_id") REFERENCES "PetSitterUser"("petsitter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_petsister_id_fkey" FOREIGN KEY ("petsister_id") REFERENCES "PetSitterUser"("petsitter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_petdetail_id_fkey" FOREIGN KEY ("petdetail_id") REFERENCES "PetDetail"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_petsitter_id_fkey" FOREIGN KEY ("petsitter_id") REFERENCES "PetSitterUser"("petsitter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_petowner_id_fkey" FOREIGN KEY ("petowner_id") REFERENCES "PetOwnerUser"("petowner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
