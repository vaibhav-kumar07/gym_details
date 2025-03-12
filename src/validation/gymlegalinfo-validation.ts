import { z } from 'zod';

export const createLegalInfoSchema = z.object({
  gymId: z.string().min(1, "Gym ID is required"),
  registrationDetails: z.object({
    number: z.string().min(1, "Registration number is required"),
    issuedBy: z.string().nullable().optional(),
    issuedDate: z.string().nullable().optional(), // Assuming date is a string in ISO format
  }),
  businessLicense: z.object({
    licenseNumber: z.string().nullable().optional(),
    expiryDate: z.string().nullable().optional(), // Assuming date is a string in ISO format
    issuedBy: z.string().nullable().optional(),
  }),
  additionalLegalDocs: z.array(
    z.object({
      docType: z.string().nullable().optional(),
      docUrl: z.string().nullable().optional(),
      expiryDate: z.string().nullable().optional(), // Assuming date is a string in ISO format
    })
  ).optional(),
});

export const updateLegalInfoSchema = createLegalInfoSchema.partial();