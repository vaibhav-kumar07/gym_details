import { z } from 'zod';

export const mediaItemSchema = z.object({
  url: z.string().url("Invalid URL format"),
  uploadedAt: z.date().default(() => new Date()),
});

export const createMediaSchema = z.object({
  gymId: z.string().min(1, "Gym ID is required"),
  images: z.array(mediaItemSchema).optional(),
  videos: z.array(mediaItemSchema).optional(),
});

export const updateMediaSchema = createMediaSchema.partial();