import ExerciseRepository from '@database/repositories/excercise-repo';
import { IExercise } from 'types/exercise-types';
import { throwBusinessError } from '@utils/error.utils';

export default class ExerciseService {
  private _exerciseRepo = new ExerciseRepository();

  async createExercise(data: IExercise): Promise<IExercise> {
    const existingExercise = await this._exerciseRepo.findByName(data.name);
    throwBusinessError(!!existingExercise, 'Exercise already exists');
    return await this._exerciseRepo.create(data);
  }

  async getAllExercises(): Promise<IExercise[]> {
    return await this._exerciseRepo.get();
  }

  async getExerciseById(id: string): Promise<IExercise | null> {
    return await this._exerciseRepo.findById(id);
  }

  async getExercisesByIds(ids: string[]): Promise<IExercise[]> {
    const exercises = await Promise.all(ids.map(id => this._exerciseRepo.findById(id)));
    return exercises.filter((exercise): exercise is IExercise => exercise !== null);
  }

  async updateExercise(id: string, updateData: Partial<IExercise>): Promise<IExercise | null> {
    const exercise = await this.getExerciseById(id);
    throwBusinessError(!exercise, `Exercise with ID ${id} not found`);
    return await this._exerciseRepo.update(id, updateData);
  }
}