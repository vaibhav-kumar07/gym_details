import { IFeature } from "types/feature-types";
import mongoose, { Schema, Document } from "mongoose";

const featureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "feature",
    timestamps: true,
  }
);

export default mongoose.model<IFeature>("Feature", featureSchema);
