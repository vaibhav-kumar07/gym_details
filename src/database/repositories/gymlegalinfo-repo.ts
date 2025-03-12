import GymLegalInfo from '../../model/gymlegalinfo.model';
import { IGymLegalInfo } from 'types/gymlegalinfo-types';

export class GymLegalInfoRepository {
  async save(data: Partial<IGymLegalInfo>, isNew: boolean = true): Promise<IGymLegalInfo> {
    const legalInfo = new GymLegalInfo(data);
    legalInfo.isNew = isNew;
    return (await legalInfo.save()).toObject() as IGymLegalInfo;
  }

  async create(data: Partial<IGymLegalInfo>): Promise<IGymLegalInfo> {
    return this.save(data);
  }

  async findByGymId(gymId: string): Promise<IGymLegalInfo | null> {
    return await GymLegalInfo.findOne({ gymId }).lean();
  }

  async update(id: string, updateData: Partial<IGymLegalInfo>): Promise<IGymLegalInfo | null> {
    const legalInfo = await GymLegalInfo.findById(id);
    if (!legalInfo) return null;

    legalInfo.set(updateData);
    legalInfo.isNew = false;
    return (await legalInfo.save()).toObject() as IGymLegalInfo;
  }

  async delete(id: string): Promise<IGymLegalInfo | null> {
    const legalInfo = await GymLegalInfo.findById(id);
    if (!legalInfo) return null;

    await legalInfo.deleteOne();
    return legalInfo.toObject() as IGymLegalInfo;
  }
}