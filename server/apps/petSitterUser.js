import { Router } from "express";
const petSitterUser = Router();

petSitterUser.get("/", (req, res) => {
  res.send("View All User Sitter");
});

export default petSitterUser;
