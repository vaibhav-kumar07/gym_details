import { z } from 'zod';
import { Types } from 'mongoose';

export const createPlanSchema = z.object({
  gymId: z.string().refine((id) => Types.ObjectId.isValid(id), "Invalid Gym ID"),
  name: z.string().min(1, "Name is required"),
  duration: z.number().positive("Duration must be a positive number"),
  price: z.number().positive("Price must be a positive number"),
  features: z.array(z.string().refine((id) => Types.ObjectId.isValid(id), "Invalid Feature ID")).nonempty("Features must include at least one item"),
  isActive: z.boolean().optional(),
});

export const updatePlanSchema = createPlanSchema.partial();