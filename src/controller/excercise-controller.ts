import { Request, Response } from 'express';
import ExerciseService from '@service/excercise-service';
import { tryCatchHandler } from '@middleware/error.middleware';

const exerciseService = new ExerciseService();

export const create = tryCatchHandler(async (req: Request, res: Response) => {
  const exercise = await exerciseService.createExercise(req.body);
  res.status(201).json({
    status: true,
    data: exercise,
  });
});

export const getAll = tryCatchHandler(async (req: Request, res: Response) => {
  const exercises = await exerciseService.getAllExercises();
  res.json({
    status: true,
    data: exercises,
  });
});
export const getById = tryCatchHandler(async (req: Request, res: Response) => {
  const exercise = await exerciseService.getExerciseById(req.params.id);
  res.json({
    status: true,
    data: exercise,
  });
});

export const getByIds = tryCatchHandler(async (req: Request, res: Response) => {
  const exercises = await exerciseService.getExercisesByIds(req.body.ids);
  res.json({
    status: true,
    data: exercises,
  });
});

export const update = tryCatchHandler(async (req: Request, res: Response) => {
  const exercise = await exerciseService.updateExercise(req.params.id, req.body);
  res.json({
    status: true,
    data: exercise,
  });
});