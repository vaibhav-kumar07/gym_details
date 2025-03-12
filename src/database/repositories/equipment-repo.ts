import { IEquipment } from 'types/equipment-types';
import EquipmentModel from 'model/equipment.model';
import { Types } from 'mongoose';
import { throwBusinessError } from '@utils/error.utils';
  
export class EquipmentRepository {
  async save(equipmentData: Partial<IEquipment>, isNew: boolean = true): Promise<IEquipment> {
    const equipment = new EquipmentModel(equipmentData);
    equipment.isNew = isNew;
    return (await equipment.save()).toObject();
  }

  async create(equipmentData: Partial<IEquipment>): Promise<IEquipment> {
    return this.save(equipmentData);
  }

  async createCustomEquipment(data: IEquipment): Promise<IEquipment> {
    // Ensure the equipment is specific to a gym
    if (!data.gymId) {
      throwBusinessError(true, 'Gym ID is required for custom equipment');
    }

    const existingEquipment = await this.findByName(data.name, data?.gymId?.toString() as string);
    throwBusinessError(!!existingEquipment, 'Equipment already exists for this gym');
    return await this.create(data);
  }
  async get(filter: { isGlobal?: boolean, gymId?: string } = {}): Promise<IEquipment[]> {
    const query: any = { ...filter };
    if (filter.gymId) {
      query.$or = [
        { isGlobal: true },
        { gymId: new Types.ObjectId(filter.gymId) }
      ];
      delete query.gymId;
    }
    return EquipmentModel.find(query);
  }

  async findById(id: string): Promise<IEquipment | null> {
    const equipment = await EquipmentModel.findById(id);
    return equipment ? equipment.toObject() as IEquipment : null;
  }
  async findByName(name: string, gymId?: string): Promise<IEquipment | null> {
    const query: any = { name };
    if (gymId) {
      query.$or = [
        { isGlobal: true },
        { gymId: new Types.ObjectId(gymId) }
      ];
    }
    const equipment = await EquipmentModel.findOne(query);
    return equipment ? equipment.toObject() as IEquipment : null;
  }
  async update(id: string, updateData: Partial<IEquipment>): Promise<IEquipment | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const equipment = await EquipmentModel.findById(id);
    if (!equipment) return null;

    // Update fields
    Object.assign(equipment, updateData);
    equipment.isNew = false; // Ensure Mongoose knows this is an update
    return (await equipment.save()).toObject();
  }
}