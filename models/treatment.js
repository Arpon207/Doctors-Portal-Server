import mongoose from "mongoose";

const TreatmentsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slots: ["string"],
  fee: {
    type: Number,
  },
});

export default mongoose.model("treatments", TreatmentsSchema);
