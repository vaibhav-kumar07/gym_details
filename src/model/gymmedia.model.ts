import { IGymmedia } from "../types/gymmedia-types";
import mongoose, { Schema, Document } from "mongoose";

const gymMediaSchema: Schema = new Schema<IGymmedia>(
  {
    gymId: { type: Schema.Types.ObjectId, ref: "Gym", required: true },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    videos: [
      {
        url: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true, collection: "media" }
);

export default mongoose.model<IGymmedia>("GymMedia", gymMediaSchema);
