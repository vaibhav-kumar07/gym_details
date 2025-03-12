import { Types } from 'mongoose';

export interface IGymLegalInfo {
  gymId: Types.ObjectId;
  registrationDetails: {
    number: string;
    issuedBy?: string | null;
    issuedDate?: Date | null;
  };
  businessLicense: {
    licenseNumber?: string | null;
    expiryDate?: Date | null;
    issuedBy?: string | null;
  };
  additionalLegalDocs: {
    docType?: string | null;
    docUrl?: string | null;
    expiryDate?: Date | null;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}