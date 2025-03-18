import Gym from "../../model/gym-model";
import { IGym, IGymStatus } from "../../types/gym-types";
export class GymRepository {
  async save(data: Partial<IGym>, isNew: boolean = true): Promise<IGym> {
    const gym = new Gym(data);
    gym.isNew = isNew;
    return (await gym.save()).toObject();
  }

  async create(data: Partial<IGym>): Promise<IGym> {
    return this.save(data);
  }

  async getGymById(id: string): Promise<IGym | null> {
    return await Gym.findById(id)
      .populate([
        { path: "legalInfo", strictPopulate: false }, // If not found, return null
        { path: "media", strictPopulate: false }, // If media ID is invalid, return null
        { path: "businessHours", strictPopulate: false }, // Same for business hours
      ])
      .lean();
  }

  async findAll(): Promise<IGym[]> {
    return await Gym.find();
  }

  async findGymByUserid(userId: string): Promise<IGym | null> {
    return await Gym.findOne({ ownerId: userId })
      .populate([
        { path: "legalInfo", strictPopulate: false }, // If not found, return null
        { path: "media", strictPopulate: false }, // If media ID is invalid, return null
        { path: "businessHours", strictPopulate: false }, // Same for business hours
      ])
      .lean();
  }

  async findGym(gym: IGym): Promise<IGym | null> {
    return (await Gym.findOne({
      name: gym.name,
      "contactInfo.email": gym.contactInfo.email,
      "contactInfo.phoneNumber": gym.contactInfo.phoneNumber,
      ownerId: gym.ownerId as string,
      status: gym.status,
    }).lean()) as IGym | null; // Ensure proper type casting
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

    gym.status = IGymStatus.Suspended;
    return await this.save(gym, false);
  }

  async changeStatus(
    id: string,
    status: "active" | "inactive" | "suspended"
  ): Promise<IGym | null> {
    const gym = await Gym.findById(id);
    if (!gym) return null;

    gym.status = status as IGymStatus;
    return await this.save(gym, false);
  }
}
