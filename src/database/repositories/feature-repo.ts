import { IFeatureRepository } from "@database/repositories/interface/feature-repo-interface";
import Feature from "@model/feature.model";
import { IFeature } from "types/feature-types";
import { Types } from "mongoose";

export class FeatureRepository implements IFeatureRepository {
  async save(
    featureInput: Partial<IFeature>,
    isNew: boolean = true
  ): Promise<IFeature> {
    const feature = new Feature(featureInput);
    feature.isNew = isNew;
    return (await feature.save()).toObject();
  }

  async create(feature: IFeature): Promise<IFeature> {
    return this.save(feature);
  }

  async get(filter: { isActive?: boolean } = {}): Promise<IFeature[]> {
    return Feature.find(filter);
  }

  async findById(id: string): Promise<IFeature | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Feature.findById(id).lean();
  }

  async findByName(name: string): Promise<IFeature | null> {
    return Feature.findOne({ name }).lean();
  }

  async update(
    id: string,
    feature: Partial<IFeature>
  ): Promise<IFeature | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Feature.findByIdAndUpdate(
      id,
      { $set: feature },
      { new: true }
    ).lean();
  }

  async deactivate(id: string) {
    const feature = await this.findById(id);
    if (feature) {
      feature.isActive = false;
      await this.save(feature, false);
    }
  }
}
