import { GymRepository } from "../database/repositories/gym-repo";
import { throwBusinessError } from "../utils/error.utils";
import { IGym } from "../types/gym-types";

export default class GymService {
  private _gymRepo = new GymRepository();

  async createGym(data: IGym): Promise<IGym> {
    console.log("data", data);
    //add validation before creatingna gym
    //add data sanitization
    //add data encryption
    //add data validation
    const gym = this._gymRepo.findGym(data);
    throwBusinessError(!gym, "Gym already exists");
    return await this._gymRepo.create(data);
  }

  async getGymById(id: string): Promise<IGym | null> {
    return await this._gymRepo.getGymById(id);
  }

  async getAllGyms(): Promise<IGym[]> {
    return await this._gymRepo.findAll();
  }

  async getGymsOwnedByUser(userId: string): Promise<IGym | null> {
    return await this._gymRepo.findGymByUserid(userId);
  }

  async updateGym(id: string, updateData: Partial<IGym>): Promise<IGym | null> {
    return await this._gymRepo.update(id, updateData);
  }

  async softDeleteGym(id: string): Promise<IGym | null> {
    return await this._gymRepo.softDelete(id);
  }

  async changeGymStatus(
    id: string,
    status: "active" | "inactive" | "suspended"
  ): Promise<IGym | null> {
    return await this._gymRepo.changeStatus(id, status);
  }
}
