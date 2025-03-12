import { z } from 'zod';

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
  ownerId: z.string().min(1, "Owner ID is required"),
  status: z.enum(["active", "inactive", "suspended"]).default("active"),
  registrationInfo: z.string().optional(),
  media: z.string().optional(),
  businessHours: z.array(z.string()).optional(),
});

export const updateGymSchema = createGymSchema.partial();