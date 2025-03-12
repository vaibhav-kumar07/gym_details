
import mongoose from "mongoose";

export interface IExercise  {
    name: string;
    description: string;
    category: string; // E.g., Strength, Cardio, Flexibility
    muscleGroups: string[]; // Targeted muscles, e.g., ["Chest", "Triceps"]
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    equipmentRequired: string[]; // E.g., ["Dumbbell", "Barbell"], or empty for bodyweight
    videoUrls: string[]; // URLs of demonstration videos
    imageUrls: string[]; // Reference images for correct form
    createdBy?: mongoose.Types.ObjectId; // Admin or Trainer who added it
    createdAt: Date;
    updatedAt: Date;
  }