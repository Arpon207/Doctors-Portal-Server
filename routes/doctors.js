import express from "express";
import doctor from "../models/doctor.js";
import verifyToken from "./../utils/verifyToken.js";
import verifyAdmin from "./../utils/verifyAdmin.js";

const router = express.Router();

router.get("/all", verifyToken, verifyAdmin, async (req, res) => {
  const result = await doctor.find();
  res.send(result);
});

router.post("/add", verifyToken, verifyAdmin, async (req, res) => {
  const body = req.body;
  const doctorData = new doctor(body);
  const result = await doctorData.save();
  res.send(result);
});

router.delete("/delete/:id", verifyToken, verifyAdmin, async (req, res) => {
  const result = await doctor.deleteOne({ _id: req.params.id });
  res.send(result);
});

export default router;
