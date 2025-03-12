import { IGym } from 'types/gym-types';
import mongoose, { Schema, Document } from 'mongoose';


const gymSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    contactInfo: {
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true, unique: true },
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    registrationInfo: { type: Schema.Types.ObjectId, ref: "GymRegistration" },
    media: { type: Schema.Types.ObjectId, ref: "GymMedia" },
    businessHours: [{ type: Schema.Types.ObjectId, ref: "GymBusinessHours" }],
  },
  { timestamps: true, collection: "gym" }
);

export default mongoose.model<IGym>('Gym', gymSchema);