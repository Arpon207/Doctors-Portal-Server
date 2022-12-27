import express from "express";
import user from "../models/user.js";
import jwt from "jsonwebtoken";
import verifyToken from "./../utils/verifyToken.js";
import verifyAdmin from "../utils/verifyAdmin.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  const users = await user.find();
  res.send(users);
});

router.get("/:email", verifyToken, async (req, res) => {
  const email = req.params.email;
  const userData = await user.findOne({ email: email });
  res.send(userData);
});

router.put("/:email", async (req, res) => {
  const filter = { email: req.params.email };
  const userData = req.body;
  const result = await user.updateOne(filter, userData, {
    upsert: true,
  });
  const token = jwt.sign(
    { email: req.params.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.send({ result, accessToken: token });
});

router.put("/admin/:email", verifyToken, verifyAdmin, async (req, res) => {
  const email = req.params.email;
  const filter = { email: email };
  const updateDoc = { admin: true };
  const result = await user.updateOne(filter, updateDoc);
  res.send(result);
});

export default router;
