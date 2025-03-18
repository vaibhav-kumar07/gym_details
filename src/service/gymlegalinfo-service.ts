import { GymLegalInfoRepository } from '../database/repositories/gymlegalinfo-repo';
import { IGymLegalInfo } from '../types/gymlegalinfo-types';

export default class GymLegalInfoService {
  private _registrationRepo = new GymLegalInfoRepository();

  async createLegalInfo(data: IGymLegalInfo): Promise<IGymLegalInfo> { 
    return await this._registrationRepo.create(data);
  }

  async getLegalInfoByGymId(gymId: string): Promise<IGymLegalInfo | null> {
    return await this._registrationRepo.findByGymId(gymId);
  }

  async updateLegalInfo(id: string, updateData: Partial<IGymLegalInfo>): Promise<IGymLegalInfo | null> {
    return await this._registrationRepo.update(id, updateData);
  }

  async deleteLegalInfo(id: string): Promise<IGymLegalInfo | null> {
    return await this._registrationRepo.delete(id);
  }
}