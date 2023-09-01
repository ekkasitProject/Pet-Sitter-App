import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const petOwnerUser = Router();

petOwnerUser.get("/", async (req, res) => {
  const users = await prisma.petOwnerUser.findMany();
  res.json(users);
});

export default petOwnerUser;
