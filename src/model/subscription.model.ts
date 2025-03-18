import { ISubscription } from '../types/subscription-types';
import mongoose, { Schema, Document } from 'mongoose';


const SubscriptionPlanSchema: Schema = new Schema({
  gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  features: [{ type: Schema.Types.ObjectId, ref: 'Feature', required: true }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{
  timestamps: true,
  collection: 'subscription'  
});

SubscriptionPlanSchema.index({ name: 1 });

export default mongoose.model<ISubscription>('SubscriptionPlan', SubscriptionPlanSchema);