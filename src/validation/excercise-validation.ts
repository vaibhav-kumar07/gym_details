import { z } from 'zod';

export const createExerciseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["Strength", "Cardio", "Flexibility"]),
  muscleGroups: z.array(z.string()).nonempty("At least one muscle group is required"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  equipmentRequired: z.array(z.string()).optional(),
  videoUrls: z.array(z.string().url()).optional(),
  imageUrls: z.array(z.string().url()).optional(),
  createdBy: z.string().optional(), // Assuming this is a string representation of ObjectId
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const updateExerciseSchema = createExerciseSchema.partial();