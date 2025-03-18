import { Schema } from "mongoose";
import { GymBusinessHoursRepository } from "../database/repositories/gymbuisnesshours-repo";
import { IGymBusinessHours } from "../types/gymbuisnesshours-types";
import GymService from "./gym-service";

export default class GymBusinessHoursService {
  private GymService = new GymService();
  private _businessHoursRepo = new GymBusinessHoursRepository();

  async createBusinessHours(
    data: IGymBusinessHours
  ): Promise<IGymBusinessHours> {
    const businesshour = await this._businessHoursRepo.create(data);
    await this.GymService.updateGym(data.gymId.toString(), {
      businessHours: businesshour?._id as Schema.Types.ObjectId,
    });
    return businesshour;
  }

  async getBusinessHoursByGymId(gymId: string): Promise<IGymBusinessHours[]> {
    return await this._businessHoursRepo.findByGymId(gymId);
  }

  async updateBusinessHours(
    id: string,
    updateData: Partial<IGymBusinessHours>
  ): Promise<IGymBusinessHours | null> {
    return await this._businessHoursRepo.update(id, updateData);
  }

  async deleteBusinessHours(id: string): Promise<IGymBusinessHours | null> {
    return await this._businessHoursRepo.delete(id);
  }
}
