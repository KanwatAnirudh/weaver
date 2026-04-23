import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["volunteer", "ngo", "admin"], required: true },
  organizationName: { type: String, default: null }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
