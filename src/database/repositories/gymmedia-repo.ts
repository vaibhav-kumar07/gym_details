import GymMedia from "../../model/gymmedia.model";
import { IGymmedia } from "../../types/gymmedia-types";

export class GymMediaRepository {
  async save(data: Partial<IGymmedia>, isNew: boolean = true): Promise<IGymmedia> {
    const media = new GymMedia(data);
    media.isNew = isNew;
    return (await media.save()).toObject();
  }

  async create(data: Partial<IGymmedia>): Promise<IGymmedia> {
    return this.save(data);
  }

  async findByGymId(gymId: string): Promise<IGymmedia | null> {
    return await GymMedia.findOne({ gymId });
  }

  async update(id: string, updateData: Partial<IGymmedia>): Promise<IGymmedia | null> {
    const media = await GymMedia.findById(id);
    if (!media) return null;

    Object.assign(media, updateData);
    media.isNew = false;
    return (await media.save()).toObject();
  }

  async delete(id: string): Promise<IGymmedia | null> {
    const media = await GymMedia.findById(id);
    if (!media) return null;

    await media.deleteOne();
    return media.toObject();
  }
}