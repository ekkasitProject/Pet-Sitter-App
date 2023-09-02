-- CreateTable
CREATE TABLE "PetOwnerUser" (
    "petowner_id" SERIAL NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "PetOwnerUser_email_key" ON "PetOwnerUser"("email");
