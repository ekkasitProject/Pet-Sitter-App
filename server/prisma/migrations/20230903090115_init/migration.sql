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

-- CreateTable
CREATE TABLE "PetDetail" (
    "pet_id" SERIAL NOT NULL,
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
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "PetDetail_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "PetSitterUser" (
    "petsitter_id" SERIAL NOT NULL,
    "image_profile" TEXT,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "experience" TEXT,
    "id_card_number" TEXT,
    "introduction" TEXT,
    "status_validate" BOOLEAN NOT NULL,
    "email_verification" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,

    CONSTRAINT "PetSitterUser_pkey" PRIMARY KEY ("petsitter_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetOwnerUser_email_key" ON "PetOwnerUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PetSitterUser_email_key" ON "PetSitterUser"("email");

-- AddForeignKey
ALTER TABLE "PetDetail" ADD CONSTRAINT "PetDetail_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "PetOwnerUser"("petowner_id") ON DELETE RESTRICT ON UPDATE CASCADE;
