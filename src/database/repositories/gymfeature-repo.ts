import { IGymFeatureRepository } from "../../database/repositories/interface/gymfeature-repo-interface";
import GymFeatureModel from "../../model/gymfeature.model";
import { IGymFeature } from "../../types/gymFeature-types";
import { Types } from "mongoose";

export class GymFeatureRepository implements IGymFeatureRepository {
  async save(
    gymFeatures: Partial<IGymFeature>,
    isNew: boolean = true
  ): Promise<IGymFeature> {
    const gymFeature = new GymFeatureModel(gymFeatures);
    gymFeature.isNew = isNew;
    return (await gymFeature.save()).toObject();
  }

  async assignFeatures(gymId: string, featureIds: string[]) {
    // Find existing gym features or create new
    let gymFeature = await GymFeatureModel.findOne({ gymId });

    if (gymFeature) {
      // Update existing features
      gymFeature.featureIds = featureIds.map((id) => new Types.ObjectId(id));
      this.save(gymFeature, false);
      return gymFeature;
    }

    // Create new gym features
    this.save({
      gymId: new Types.ObjectId(gymId),
      featureIds: featureIds.map((id) => new Types.ObjectId(id)),
      isActive: true,
    });
  }

  async unassignFeatures(gymId: string, featureIds: string[]): Promise<void> {
    const gymFeature = await GymFeatureModel.findOne({ gymId });
    if (gymFeature) {
      // Remove specified features from the array
      gymFeature.featureIds = gymFeature.featureIds.filter(
        (id: Types.ObjectId) => !featureIds.includes(id.toString())
      );
      await this.save(gymFeature, false);
    }
  }

  async getGymFeatures(gymId: string): Promise<IGymFeature[]> {
    return await GymFeatureModel.find({ gymId }).populate("featureIds").lean();
  }

  async removeGymFeatures(gymId: string): Promise<void> {
    await GymFeatureModel.findOneAndDelete({ gymId });
  }

  async checkFeatureAssignment(
    gymId: string,
    featureId: string
  ): Promise<boolean> {
    const gymFeature = await GymFeatureModel.findOne({
      gymId: new Types.ObjectId(gymId),
      featureId: new Types.ObjectId(featureId),
    });
    return !!gymFeature;
  }
}
