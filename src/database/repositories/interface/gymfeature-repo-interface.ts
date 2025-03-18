import { IGymFeature } from "../../../types/gymFeature-types";

export interface IGymFeatureRepository {
  assignFeatures(gymId: string, featureIds: string[]): void;
  getGymFeatures(gymId: string): Promise<IGymFeature[]>;
  removeGymFeatures(gymId: string): Promise<void>;
  checkFeatureAssignment(gymId: string, featureId: string): Promise<boolean>;
}
