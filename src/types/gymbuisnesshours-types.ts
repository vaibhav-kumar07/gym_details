import { Types } from 'mongoose';

export interface IGymBusinessHours {
  gymId: Types.ObjectId;
  timings: {
    timeSlotId: string; // Changed to string
    openTime: string;
    closeTime: string;
  }[];
  schedules: {
    days: string[];
    timeSlotId: string; // Changed to string
  }[];
  closedDays: string[];
  holidays: {
    date: Date;
    reason: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}