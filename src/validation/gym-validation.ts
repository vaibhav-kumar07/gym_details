import { z } from 'zod';
import { IGymStatus } from '../types/gym-types';
export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

export const contactInfoSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format"),
});

export const createGymSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: addressSchema,
  contactInfo: contactInfoSchema,
  status: z.enum([IGymStatus.Active,IGymStatus.InActive,IGymStatus.Suspended]).default(IGymStatus.Active),
  legalInfo: z.string().optional(),
  media: z.string().optional(),
  businessHours: z.string().optional(),
});

export const updateGymSchema = createGymSchema.partial();