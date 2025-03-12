import { IExercise } from "types/exercise-types";
import mongoose, { Schema, Document } from "mongoose";



const exerciseSchema = new Schema<IExercise>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    muscleGroups: { type: [String], required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    equipmentRequired: { type: [String], default: [] },
    videoUrls: { type: [String], default: [] },
    imageUrls: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null }, 
  },
  { timestamps: true, collection: "exercise" }
);

// Indexes for optimized search & filtering
exerciseSchema.index({ name: 1 });
exerciseSchema.index({ category: 1 });
exerciseSchema.index({ muscleGroups: 1 });

export default mongoose.model<IExercise>("Exercise", exerciseSchema);
