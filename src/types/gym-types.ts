import Types from 'mongoose';

export interface IGym extends Document {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contactInfo: {
    phoneNumber: string;
    email: string;
  };
  ownerId: Types.ObjectId;
  status: IGymStatus;
  registrationInfo?: Types.ObjectId;
  media?: Types.ObjectId;
  businessHours: Types.ObjectId[];
}



export enum IGymStatus {
    Active = "active",
    InActive = "inactive",
    Suspended = "suspended"
}