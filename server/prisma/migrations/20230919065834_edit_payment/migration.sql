/*
  Warnings:

  - You are about to drop the column `booking_id` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_booking_id_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "booking_id";
