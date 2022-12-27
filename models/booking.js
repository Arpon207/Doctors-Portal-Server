import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    treatment_id: {
      type: String,
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("booking", bookingSchema);
