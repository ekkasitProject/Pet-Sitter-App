import dotenv from "dotenv";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

const payments = Router();
const prisma = new PrismaClient();
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret =
  "whsec_99519e6aed9aed9e03c942347002169dd8fc1e4a6e8fe5037654397c11569940";

// 1 Placeorder
payments.post("/api/checkout", async (req, res) => {
  const { product } = req.body;
  try {
    // create payment session
    const orderId = uuidv4();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:6543/payments/success.html?id=${orderId}`,
      cancel_url: `http://localhost:6543/payments/cancel.html?id=${orderId}`,
    });

    // create order in database (name, address, session id, status)
    console.log("session", session);

    const data = {
      order_id: orderId,
      session_id: session.id,
      payment_status: session.status,
    };

    const result = await prisma.Payment.create({
      data,
    });

    res.json({
      message: "Checkout success.",
      result,
      //   id: session.id,
      //   result,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).json({ error: "Error payment" });
  }
});

// 2 webhook
payments.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = await stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentSuccessData = event.data.object;
      const sessionId = paymentSuccessData.id;

      const data = {
        status: paymentSuccessData.status,
      };

      const result = await prisma.Payment.findUnique({
        where: {
          session_id: sessionId,
        },
      });

      console.log("=== update result", result);

      // event.data.object.id = session.id
      // event.data.object.customer_details คือข้อมูลลูกค้า
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

// 3 recheck status
payments.get("/order/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await prisma.Payment.findUnique({
      where: {
        order_id: orderId,
      },
    });

    const selectedOrder = result[0];
    if (!selectedOrder) {
      throw {
        errorMessage: "Order not found",
      };
    }
    res.json(selectedOrder);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ error: error.errorMessage || "System error" });
  }
});

export default payments;
