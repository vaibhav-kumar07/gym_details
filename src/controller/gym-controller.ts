import { Request, Response } from 'express';
import GymService from '@service/gym-service';
import { tryCatchHandler } from '@middleware/error.middleware';

const gymService = new GymService();

export const create = tryCatchHandler(async (req: Request, res: Response) => {
  const gym = await gymService.createGym(req.body);
  res.status(201).json({
    status: true,
    data: gym,
  });
});

export const getById = tryCatchHandler(async (req: Request, res: Response) => {
  const gym = await gymService.getGymById(req.params.gymId);
  res.json({
    status: true,
    data: gym,
  });
});

export const getAll = tryCatchHandler(async (req: Request, res: Response) => {
  const gyms = await gymService.getAllGyms();
  res.json({
    status: true,
    data: gyms,
  });
});

export const getOwnedByUser = tryCatchHandler(async (req: Request, res: Response) => {
  const gyms = await gymService.getGymsOwnedByUser( req.body.loggedInUser.id);
  res.json({
    status: true,
    data: gyms,
  });
});

export const update = tryCatchHandler(async (req: Request, res: Response) => {
  const gym = await gymService.updateGym(req.params.gymId, req.body);
  res.json({
    status: true,
    data: gym,
  });
});

export const softDelete = tryCatchHandler(async (req: Request, res: Response) => {
  await gymService.softDeleteGym(req.params.gymId);
  res.json({
    status: true,
    message: "Gym soft-deleted successfully",
  });
});

export const changeStatus = tryCatchHandler(async (req: Request, res: Response) => {
  const gym = await gymService.changeGymStatus(req.params.gymId, req.body.status);
  res.json({
    status: true,
    data: gym,
  });
});

// Placeholder for access and features
export const checkAccess = tryCatchHandler(async (req: Request, res: Response) => {
  // Implement access check logic
  res.json({
    status: true,
    message: "Access granted",
  });
});

export const listFeatures = tryCatchHandler(async (req: Request, res: Response) => {
  // Implement feature listing logic
  res.json({
    status: true,
    data: [], // Replace with actual features
  });
});