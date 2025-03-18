import { IEquipment } from '../types/equipment-types';
import mongoose, { Schema,  } from 'mongoose';

const EquipmentSchema: Schema = new Schema({
  gymId: { type: Schema.Types.ObjectId, ref: 'Gym', index: true, sparse: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  isGlobal: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{
  timestamps: true,
  collection: 'equipment'
});

// Unique constraint for gym-specific equipment
EquipmentSchema.index({ gymId: 1, name: 1 }, { unique: true, sparse: true });

export default mongoose.model<IEquipment>('Equipment', EquipmentSchema);