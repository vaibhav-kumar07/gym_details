import { GymMediaRepository } from '../database/repositories/gymmedia-repo';
import { IGymmedia } from '../types/gymmedia-types';

export default class GymMediaService {
  private _mediaRepo = new GymMediaRepository();

  async createMedia(data: IGymmedia): Promise<IGymmedia> {
    return await this._mediaRepo.create(data);
  }

    async getMediaByGymId(gymId: string): Promise<IGymmedia | null> {
    return await this._mediaRepo.findByGymId(gymId);
  }

  async updateMedia(id: string, updateData: Partial<IGymmedia>): Promise<IGymmedia | null> {
    return await this._mediaRepo.update(id, updateData);
  }

  async deleteMedia(id: string): Promise<IGymmedia | null> {
    return await this._mediaRepo.delete(id);
  }
}