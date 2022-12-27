import mongoose from "mongoose";

const { Schema } = mongoose;

const doctorSchema = new Schema({}, { strict: false });

export default mongoose.model("doctors", doctorSchema);
