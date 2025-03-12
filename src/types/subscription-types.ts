import { Types } from 'mongoose';

export interface ISubscription {
  _id: Types.ObjectId;
  gymId: Types.ObjectId;
  name: string;
  duration: number;
  price: number;
  features: Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}