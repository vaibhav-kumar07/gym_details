import { IFeature } from "types/feature-types";

export interface IFeatureRepository {
  //make save function can be used to create or update a feature for internal functino only ,cannot called from outside
  save(featureInput: Partial<IFeature>, isNew?: boolean): Promise<IFeature>;
  create(feature: Partial<IFeature>): Promise<IFeature>;
  get(filter?: { isActive?: boolean }): Promise<IFeature[]>;
  findById(id: string): Promise<IFeature | null>;
  findByName(name: string): Promise<IFeature | null>;
  update(id: string, feature: Partial<IFeature>): Promise<IFeature | null>;
  deactivate(id: string): Promise<void>;
}
