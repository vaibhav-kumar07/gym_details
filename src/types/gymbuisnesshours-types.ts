import { Types, Schema } from "mongoose";

export interface IGymBusinessHours {
  _id?: Schema.Types.ObjectId;
  gymId: Schema.Types.ObjectId | string;
  timings: {
    timeSlotId: string;
    openTime: string;
    closeTime: string;
  }[];
  schedules: {
    days: string[];
    timeSlotId: string;
  }[];
  closedDays: string[];
  holidays: {
    date: Date;
    reason: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
