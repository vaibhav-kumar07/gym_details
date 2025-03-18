import { IGymFeature } from "../types/gymFeature-types";
import { throwBusinessError } from "../utils/error.utils";
import { GymFeatureRepository } from "../database/repositories/gymfeature-repo";
import FeatureService from "./feature.service";

export default class GymFeatureService {
  private _gymFeatureRepo = new GymFeatureRepository();
  private _featureService = new FeatureService();
  async assignFeaturesToGym(gymId: string, featureIds: string[]) {
    for (const featureId of featureIds) {
      const feature = await this._featureService.getFeatureById(featureId);
      throwBusinessError(!feature, `Feature with ID ${featureId} not found`);
    }
    await this._gymFeatureRepo.assignFeatures(gymId, featureIds);
  }

  async unassignFeaturesFromGym(gymId: string, featureIds: string[]) {
    await this._gymFeatureRepo.unassignFeatures(gymId, featureIds);
  }

  async getGymFeatures(gymId: string): Promise<IGymFeature[]> {
    return await this._gymFeatureRepo.getGymFeatures(gymId);
  }

  async removeGymFeatures(gymId: string): Promise<void> {
    await this._gymFeatureRepo.removeGymFeatures(gymId);
  }

  async checkFeatureAssignment(
    gymId: string,
    featureId: string
  ): Promise<boolean> {
    const feature = await this._featureService.getFeatureById(featureId);
    throwBusinessError(!feature, `Feature with ID ${featureId} not found`);
    return await this._gymFeatureRepo.checkFeatureAssignment(gymId, featureId);
  }
}
