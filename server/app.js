import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import petOwnerUser from "./apps/petowneruser.js";
import petSitterUser from "./apps/petSitterUser.js";
async function init() {
  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/petowneruser", petOwnerUser);
  app.use("/petSitterUser", petSitterUser);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

init().catch();
