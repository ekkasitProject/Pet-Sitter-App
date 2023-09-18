import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import petOwnerUser from "./apps/petOwnerUser.js";
import petSitterUser from "./apps/petSitterUser.js";
import petDetail from "./apps/petDetail.js";
import petSisterDetail from "./apps/petSisterDetail.js";
import payment from "./Payment/payment.js";
import booking from "./apps/booking.js";
async function init() {
  const app = express();
  const port = 6543;

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/petOwnerUser", petOwnerUser);
  app.use("/petOwnerUser/petdetail", petDetail);
  app.use("/petSitterUser", petSitterUser);
  app.use("/petSitterUser/petsisterdetail", petSisterDetail);

  app.use("/payment", payment);
  app.use("/booking", booking);
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
