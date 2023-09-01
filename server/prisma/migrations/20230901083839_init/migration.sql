-- CreateTable
CREATE TABLE "PetOwnerUser" (
    "petowner_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "image_profile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_card_number" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "status_validate" BOOLEAN NOT NULL,

    CONSTRAINT "PetOwnerUser_pkey" PRIMARY KEY ("petowner_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetOwnerUser_email_key" ON "PetOwnerUser"("email");
