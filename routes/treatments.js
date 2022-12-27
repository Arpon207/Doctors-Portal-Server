import express from "express";
import booking from "../models/booking.js";
import treatment from "../models/treatment.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const body = req.body;
  const treatmentData = new treatment(body);
  const result = await treatmentData.save();
  res.send(result);
});

router.get("/", async (req, res) => {
  const result = await treatment.find().select("name");
  res.send(result);
});

router.get("/available", async (req, res) => {
  const date = req.query.date;
  const treatments = await treatment.find();
  const bookings = await booking.find({ date: date });
  treatments.forEach((treatment) => {
    const booked = bookings.filter(
      (booking) => booking.treatment === treatment.name
    );
    const bookedSlots = booked.map((b) => b.slot);
    const availableSlots = treatment.slots.filter(
      (slot) => !bookedSlots.includes(slot)
    );
    treatment.slots = availableSlots;
  });
  res.send(treatments);
});

export default router;
