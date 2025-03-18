import { EquipmentRepository } from '../database/repositories/equipment-repo';
import { IEquipment } from '../types/equipment-types';
import { throwBusinessError } from '../utils/error.utils';

export default class EquipmentService {
  private _equipmentRepo = new EquipmentRepository();

  async createEquipment(data: IEquipment): Promise<IEquipment> {
    const existingEquipment = await this._equipmentRepo.findByName(data.name, data.gymId?.toString());
    throwBusinessError(!!existingEquipment, 'Equipment already exists');
    return await this._equipmentRepo.create(data);
  }

  async createCustomEquipment(data: IEquipment): Promise<IEquipment> {
    return await this._equipmentRepo.createCustomEquipment(data);
  }

  async getEquipmentById(id: string): Promise<IEquipment | null> {
    return await this._equipmentRepo.findById(id);
  }

  async getEquipmentByName(name: string, gymId?: string): Promise<IEquipment | null> {
    return await this._equipmentRepo.findByName(name, gymId);
  }

  async getAllEquipment(gymId?: string): Promise<IEquipment[]> {
    return await this._equipmentRepo.get({ gymId });
  }

  async updateEquipment(id: string, updateData: Partial<IEquipment>): Promise<IEquipment | null> {
    const equipment = await this.getEquipmentById(id);
    throwBusinessError(!equipment, `Equipment with ID ${id} not found`);
    return await this._equipmentRepo.update(id, updateData);
  }
}