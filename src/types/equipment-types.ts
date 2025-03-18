import mongoose from 'mongoose';

//inequipment shoudlbe there like videos and images how to use it and picture alos of how it look 
//and also how to use it and how to store it 

export interface IEquipment  {
    gymId?: mongoose.Types.ObjectId; // Optional for global equipment

    name: string;
    category: string;
    isGlobal: boolean;
    createdAt: Date;
    updatedAt: Date;
  }