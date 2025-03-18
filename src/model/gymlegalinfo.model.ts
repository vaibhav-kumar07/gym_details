import mongoose, { Schema } from "mongoose";
import { IGymLegalInfo } from "../types/gymlegalinfo-types";

const gymLegalInfoSchema: Schema = new Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
      unique: true,
    },
    registrationDetails: {
      number: { type: String, required: true, unique: true },
      issuedBy: { type: String, default: null },
      issuedDate: { type: Date, default: null },
    },
    businessLicense: {
      licenseNumber: { type: String, default: null },
      expiryDate: { type: Date, default: null },
      issuedBy: { type: String, default: null },
    },
    additionalLegalDocs: [
      {
        docType: { type: String, default: null },
        docUrl: { type: String, default: null },
        expiryDate: { type: Date, default: null },
      },
    ],
  },
  { timestamps: true, collection: "legalinfo" }
);

export default mongoose.model<IGymLegalInfo>(
  "GymLegalInfo",
  gymLegalInfoSchema
);
