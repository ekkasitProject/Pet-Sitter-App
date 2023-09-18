/*
  Warnings:

  - You are about to drop the column `petdetail_id` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status_booking` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_petdetail_id_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "petdetail_id",
ADD COLUMN     "petdetails" TEXT[],
ADD COLUMN     "total_price" INTEGER NOT NULL,
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transaction_no" SERIAL NOT NULL,
DROP COLUMN "status_booking",
ADD COLUMN     "status_booking" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetDetail" ADD COLUMN     "status_pet" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "StatusBookingEnum";
