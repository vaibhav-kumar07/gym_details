import { Request, Response } from 'express';
import GymBusinessHoursService from '../service/gymbuisnesshours-service';
import { tryCatchHandler } from '../middleware/error.middleware';

const businessHoursService = new GymBusinessHoursService();

export const create = tryCatchHandler(async (req: Request, res: Response) => {
  const businessHours = await businessHoursService.createBusinessHours(req.body);
  res.status(201).json({
    status: true,
    data: businessHours,
  });
});

export const getByGymId = tryCatchHandler(async (req: Request, res: Response) => {
  const businessHours = await businessHoursService.getBusinessHoursByGymId(req.params.gymId);
  res.json({
    status: true,
    data: businessHours,
  });
});

export const update = tryCatchHandler(async (req: Request, res: Response) => {
  const businessHours = await businessHoursService.updateBusinessHours(req.params.id, req.body);
  res.json({
    status: true,
    data: businessHours,
  });
});

export const deleteBusinessHours = tryCatchHandler(async (req: Request, res: Response) => {
  await businessHoursService.deleteBusinessHours(req.params.id);
  res.json({
    status: true,
    message: "Business hours deleted successfully",
  });
});