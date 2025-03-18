import GymBusinessHours from '../../model/gymbuisnesshours.model';
import { IGymBusinessHours } from '../../types/gymbuisnesshours-types';


export class GymBusinessHoursRepository {
  async save(data: Partial<IGymBusinessHours>, isNew: boolean = true): Promise<IGymBusinessHours> {
    const businessHours = new GymBusinessHours(data);
    businessHours.isNew = isNew;
    return (await businessHours.save()).toObject() as any;
  }

  async create(data: Partial<IGymBusinessHours>): Promise<IGymBusinessHours> {
    return this.save(data);
  }

  async findByGymId(gymId: string): Promise<IGymBusinessHours[]> {
    return await GymBusinessHours.find({ gymId }).lean() as any
  }

  async update(id: string, updateData: Partial<IGymBusinessHours>): Promise<IGymBusinessHours | null> {
    const businessHours = await GymBusinessHours.findById(id);
    if (!businessHours) return null;

    businessHours.set(updateData);
    businessHours.isNew = false;
    return (await businessHours.save()).toObject() as any;
  }

  async delete(id: string): Promise<IGymBusinessHours | null> {
    const businessHours = await GymBusinessHours.findById(id);
    if (!businessHours) return null;

    await businessHours.deleteOne();
    return businessHours.toObject() as any;
  }
}