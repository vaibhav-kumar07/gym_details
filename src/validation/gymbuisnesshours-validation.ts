import { z } from 'zod';

export const createBusinessHoursSchema = z.object({
  gymId: z.string().min(1, "Gym ID is required"),
  timings: z.array(
    z.object({
      timeSlotId: z.string().min(1, "Time slot ID is required"),
      openTime: z.string().min(1, "Open time is required"),
      closeTime: z.string().min(1, "Close time is required")
    })
  ).nonempty("At least one timing is required"),
  schedules: z.array(
    z.object({
      days: z.array(z.string().min(1)).nonempty("At least one day is required"),
      timeSlotId: z.string().min(1, "Time slot ID is required")
    })
  ).optional(),
  closedDays: z.array(z.string().min(1)).optional(),
  holidays: z.array(
    z.object({
      date: z.string().min(1, "Date is required"), // Assuming date is a string in ISO format
      reason: z.string().optional()
    })
  ).optional()
});

export const updateBusinessHoursSchema = createBusinessHoursSchema.partial();