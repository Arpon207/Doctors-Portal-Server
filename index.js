import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 5000;

import treatmentsRoute from "./routes/treatments.js";
import bookingRoute from "./routes/bookings.js";
import userRoute from "./routes/users.js";
import doctorRoute from "./routes/doctors.js";
import paymentRoute from "./routes/payments.js";

// middlewares

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/treatments/", treatmentsRoute);
app.use("/api/bookings/", bookingRoute);
app.use("/api/users/", userRoute);
app.use("/api/doctors/", doctorRoute);
app.use("/api/payment/", paymentRoute);

// connection

const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to mongodb");
};

//api
app.get("/", async (req, res) => {
  res.send("Doctors Portal server.");
});

app.listen(port, () => {
  connection();
});
