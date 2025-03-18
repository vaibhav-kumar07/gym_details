import { IGymFeature } from "../types/gymFeature-types";
import mongoose, { Schema } from "mongoose";

const gymFeatureSchema = new Schema<IGymFeature>(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "gym",
    },
    featureIds: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Feature",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "feature",
  }
);

// Index for faster lookups
gymFeatureSchema.index({ gymId: 1 });
gymFeatureSchema.index({ featureIds: 1 });

// Virtual populate to get feature details
gymFeatureSchema.virtual("features", {
  ref: "Feature",
  localField: "featureIds",
  foreignField: "_id",
});

// Ensure virtuals are included in JSON
gymFeatureSchema.set("toJSON", { virtuals: true });
gymFeatureSchema.set("toObject", { virtuals: true });

export default mongoose.model<IGymFeature>("GymFeature", gymFeatureSchema);
