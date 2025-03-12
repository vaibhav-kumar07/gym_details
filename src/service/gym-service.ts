import { GymRepository } from '@database/repositories/gym-repo';
import { IGym } from 'types/gym-types';

export default class GymService {
  private _gymRepo = new GymRepository();

  async createGym(data: IGym): Promise<IGym> {
    return await this._gymRepo.create(data);
  }

  async getGymById(id: string): Promise<IGym | null> {
    return await this._gymRepo.findById(id);
  }

  async getAllGyms(): Promise<IGym[]> {
    return await this._gymRepo.findAll();
  }

  async getGymsOwnedByUser(userId: string): Promise<IGym[]> {
    return await this._gymRepo.findOwnedByUser(userId);
  }

  async updateGym(id: string, updateData: Partial<IGym>): Promise<IGym | null> {
    return await this._gymRepo.update(id, updateData);
  }

  async softDeleteGym(id: string): Promise<IGym | null> {
    return await this._gymRepo.softDelete(id);
  }

  async changeGymStatus(id: string, status: "active" | "inactive" | "suspended"): Promise<IGym | null> {
    return await this._gymRepo.changeStatus(id, status);
  }
}