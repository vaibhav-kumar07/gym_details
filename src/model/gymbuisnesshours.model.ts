import mongoose, { Schema, model, Types } from "mongoose";
import { IGymBusinessHours } from "../types/gymbuisnesshours-types";
const BusinessHoursSchema = new Schema<IGymBusinessHours>(
  {
    gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym", required: true },
    timings: [
      {
        timeSlotId: { type: String, required: true },
        openTime: { type: String, required: true },
        closeTime: { type: String, required: true },
      },
    ],
    schedules: [
      {
        days: [{ type: String, required: true }],
        timeSlotId: { type: String, required: true },
      },
    ],
    closedDays: [{ type: String }],
    holidays: [
      {
        date: { type: Date, required: true },
        reason: { type: String, default: "" },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "businesshour",
  }
);

const BusinessHours = model("businesshour", BusinessHoursSchema);
export default BusinessHours;
