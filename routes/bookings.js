import express from "express";
import booking from "../models/booking.js";
import verifyToken from "./../utils/verifyToken.js";
import mongoose from "mongoose";

const router = express.Router();

const { Schema } = mongoose;

const paymentSchema = new Schema({}, { strict: false });

const payment = mongoose.model("payments", paymentSchema);

router.post("/add", async (req, res) => {
  const body = req.body.booking;
  const bookingData = new booking(body);
  try {
    const result = await bookingData.save();
    res.status(200).send(result);
  } catch (error) {
    throw error;
  }
});

router.get("/", verifyToken, async (req, res) => {
  const decodedEmail = req.decodedEmail;
  const date = req.query.date;
  const email = req.query.email;
  if (email === decodedEmail) {
    const result = await booking.find({ date: date, patientEmail: email });
    res.send(result);
  } else {
    res.status(403).send({ message: "Forbidden access" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const result = await booking.findById(req.params.id);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const body = req.body;
  const updateDoc = {
    paid: true,
    transactionId: body.transactionId,
  };
  const result = await booking.updateOne(filter, updateDoc, {
    upsert: true,
  });
  const paymentData = new payment(body);
  const paymentResult = await paymentData.save();
  res.send({
    updateResult: result,
    paymentUpdate: paymentResult,
  });
});

router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const result = await booking.findByIdAndDelete(id);
  res.send(result);
});

export default router;
