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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6nys0kf.mongodb.net/Doctors-Portal?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("connected to backend");
    });
  });

//api
app.get("/", async (req, res) => {
  res.send("Doctors Portal server.");
});
