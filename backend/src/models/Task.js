import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    enum: ["critical", "high", "medium", "low"],
    required: true,
  },
  locationZone: {
    type: String,
    required: true,
  },
  distanceKm: {
    type: Number,
    default: 5,
  },
  skillsRequired: {
    type: [String],
    default: [],
  },
  hours: {
    type: Number,
    required: true,
  },
  peopleRequired: {
    type: Number,
    required: true,
    min: 1,
  },
  payout: {
    type: String,
    default: "None",
  },
  locationMatch: {
    type: Number,
    default: 0.9,
  },
  skillMatch: {
    type: Number,
    default: 0.9,
  },
  status: {
    type: String,
    enum: ["planned", "waiting for volunteers", "ongoing", "ended"],
    default: "waiting for volunteers",
  },
  appliedVolunteers: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);

