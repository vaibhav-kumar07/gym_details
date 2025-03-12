import Gym from '@model/gym-model';
import { IGym, IGymStatus } from 'types/gym-types';
export class GymRepository {
  async save(data: Partial<IGym>, isNew: boolean = true): Promise<IGym> {
    const gym = new Gym(data);
    gym.isNew = isNew;
    return (await gym.save()).toObject();
  }

  async create(data: Partial<IGym>): Promise<IGym> {
    return this.save(data);
  }

  async findById(id: string): Promise<IGym | null> {
    return await Gym.findById(id).where({ isDeleted: false });
  }

  async findAll(): Promise<IGym[]> {
    return await Gym.find({ isDeleted: false });
  }

  async findOwnedByUser(userId: string): Promise<IGym[]> {
    return await Gym.find({ ownerId: userId, isDeleted: false });
  }

  async update(id: string, updateData: Partial<IGym>): Promise<IGym | null> {
    const gym = await Gym.findById(id);
    if (!gym) return null;

    gym.set(updateData);
    if (updateData.status) {
        gym.status = updateData.status as IGymStatus;
    }
    return await gym.save();
  }

  async softDelete(id: string): Promise<IGym | null> {
    const gym = await Gym.findById(id);
    if (!gym) return null;

    gym.status =   IGymStatus.Suspended
    return await this.save(gym, false);
  }

  async changeStatus(id: string, status: "active" | "inactive" | "suspended"): Promise<IGym | null> {
    const gym = await Gym.findById(id);
    if (!gym) return null;

    gym.status = status as IGymStatus;
    return await this.save(gym, false);
  }
}