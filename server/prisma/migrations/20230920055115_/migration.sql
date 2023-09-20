/*
  Warnings:

  - You are about to drop the column `petsitter_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the `PetSitterDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `petsitter_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_petsitter_id_fkey";

-- DropForeignKey
ALTER TABLE "PetSitterDetail" DROP CONSTRAINT "PetSitterDetail_petsitter_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "petsitter_id",
ADD COLUMN     "petsitter_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "PetSitterDetail";

-- CreateTable
CREATE TABLE "PetSitterDetail" (
    "petsitterdetail_id" TEXT NOT NULL,
    "petsitter_id" TEXT NOT NULL,
    "pet_sitter_name" TEXT,
    "pet_type" TEXT[],
    "services" TEXT,
    "my_place" TEXT,
    "image_gallery" TEXT[],
    "experience" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetSitterDetail_pkey" PRIMARY KEY ("petsitterdetail_id")
);

-- AddForeignKey
ALTER TABLE "PetSitterDetail" ADD CONSTRAINT "PetSitterDetail_petsitter_id_fkey" FOREIGN KEY ("petsitter_id") REFERENCES "PetSitterUser"("petsitter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_petsitter_id_fkey" FOREIGN KEY ("petsitter_id") REFERENCES "PetSitterUser"("petsitter_id") ON DELETE RESTRICT ON UPDATE CASCADE;
