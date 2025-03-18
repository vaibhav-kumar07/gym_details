import Exercise from "../../model/exercise.model";
import { Types } from 'mongoose';
import { IExercise } from "../../types/exercise-types";

export default class ExerciseRepository {
  async save(exerciseData: Partial<IExercise>, isNew: boolean = true): Promise<IExercise> {
    const exercise = new Exercise(exerciseData);
    exercise.isNew = isNew;
    return (await exercise.save()).toObject();
  }

  async create(exerciseData: Partial<IExercise>): Promise<IExercise> {
    return this.save(exerciseData);
  }


  async get(filter: { isGlobal?: boolean, gymId?: string } = {}): Promise<IExercise[]> {
    const query: any = { ...filter };
    if (filter.gymId) {
      query.$or = [
        { isGlobal: true },
        { gymId: new Types.ObjectId(filter.gymId) }
      ];
      delete query.gymId;
    }
    return Exercise.find(query);
  }

  async findById(id: string): Promise<IExercise | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Exercise.findById(id).lean();
  }

  async findByName(name: string): Promise<IExercise | null> {
    return Exercise.findOne({ name }).lean();
  }

  async update(id: string, updateData: Partial<IExercise>): Promise<IExercise | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return Exercise.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
  }

  
}