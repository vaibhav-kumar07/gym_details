import { IFeature } from "./feature-types";
import { Types } from "mongoose";

export interface IGymFeature {
  gymId: Types.ObjectId;
  featureIds: Types.ObjectId[]; // Array of feature IDs
  features?: IFeature[]; // Populated feature details
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
