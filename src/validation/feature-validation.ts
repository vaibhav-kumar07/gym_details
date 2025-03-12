import { z } from "zod";

export const createFeatureSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  isActive: z.boolean().optional().default(true),
});

export const updateFeatureSchema = createFeatureSchema.partial();

export const assignFeaturesSchema = z.object({
  featureIds: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid feature ID format"))
    .min(1, "At least one feature must be selected"),
});

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;
export type UpdateFeatureInput = z.infer<typeof updateFeatureSchema>;
export type AssignFeaturesInput = z.infer<typeof assignFeaturesSchema>;
