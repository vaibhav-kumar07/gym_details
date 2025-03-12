import { z } from 'zod';

export const createEquipmentSchema = z.object({
  gymId: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  isGlobal: z.boolean().default(false),
  videoUrls: z.array(z.string().url()).optional(),
  imageUrls: z.array(z.string().url()).optional(),
  usageInstructions: z.string().min(1, "Usage instructions are required"),
  storageInstructions: z.string().min(1, "Storage instructions are required"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const updateEquipmentSchema = createEquipmentSchema.partial();