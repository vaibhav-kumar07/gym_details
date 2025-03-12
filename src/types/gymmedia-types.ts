import mongoose from 'mongoose';

export interface IGymmedia  {
    gymId: mongoose.Types.ObjectId;
    images: { url: string; uploadedAt: Date }[];
    videos: { url: string; uploadedAt: Date }[];
  }