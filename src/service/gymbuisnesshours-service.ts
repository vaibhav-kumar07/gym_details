import { GymBusinessHoursRepository } from '../database/repositories/gymbuisnesshours-repo';
import { IGymBusinessHours } from 'types/gymbuisnesshours-types';

export default class GymBusinessHoursService {
  private _businessHoursRepo = new GymBusinessHoursRepository();

  async createBusinessHours(data: IGymBusinessHours): Promise<IGymBusinessHours> {
    return await this._businessHoursRepo.create(data);
  }

  async getBusinessHoursByGymId(gymId: string): Promise<IGymBusinessHours[]> {
    return await this._businessHoursRepo.findByGymId(gymId);
  }

  async updateBusinessHours(id: string, updateData: Partial<IGymBusinessHours>): Promise<IGymBusinessHours | null> {
    return await this._businessHoursRepo.update(id, updateData);
  }

  async deleteBusinessHours(id: string): Promise<IGymBusinessHours | null> {
    return await this._businessHoursRepo.delete(id);
  }
}