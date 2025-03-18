import { IGym, IGymStatus } from "../types/gym-types";
import mongoose, { Schema, Document } from "mongoose";

const gymSchema: Schema = new Schema<IGym>(
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
    ownerId: { type: String, required: true },
    status: {
      type: String,
      enum: [IGymStatus.Active, IGymStatus.InActive, IGymStatus.Suspended],
      default: IGymStatus.Active,
    },
    legalInfo: { type: Schema.Types.ObjectId, ref: "legalinfo" },
    media: { type: Schema.Types.ObjectId, ref: "media" },
    businessHours: { type: Schema.Types.ObjectId, ref: "businesshour" },
  },
  { timestamps: true, collection: "gym" }
);

export default mongoose.model<IGym>("Gym", gymSchema);
