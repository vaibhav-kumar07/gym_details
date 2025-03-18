
import { IFeature } from "../types/feature-types";
import {
  CreateFeatureInput,
  UpdateFeatureInput,
} from "../validation/feature-validation";
import { FeatureRepository } from "../database/repositories/feature-repo";
import { throwBusinessError } from "../utils/error.utils";

export default class FeatureService {
  private _featureRepo = new FeatureRepository();
  // Admin Operations
  async createFeature(data: IFeature): Promise<IFeature> {
    const feature = await this._featureRepo.findByName(data.name);
    throwBusinessError(!!feature, `Feature already exists`);
    return await this._featureRepo.create(data);
  }
  async getAllFeatures(isAdmin: boolean = false) {
    const query = isAdmin ? {} : { isActive: true };
    return await this._featureRepo.get(query);
  }

  async getFeatureById(id: string): Promise<IFeature | null> {
    return await this._featureRepo.findById(id);
  }

  async updateFeature(
    id: string,
    data: UpdateFeatureInput
  ): Promise<IFeature | null> {
    const feature = await this.getFeatureById(id);
    throwBusinessError(!feature, `Feature with ID ${id} not found`);
    return await this._featureRepo.update(id, data);
  }

  async deleteFeature(id: string) {
    await this._featureRepo.deactivate(id);
  }
}
