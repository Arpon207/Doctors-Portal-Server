import Stripe from "stripe";
import express from "express";
import verifyToken from "./../utils/verifyToken.js";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

router.post("/create-payment-indent", verifyToken, async (req, res) => {
  const price = req.body.price;
  const amount = price * 100;
  const paymentIndent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIndent.client_secret });
});

export default router;
