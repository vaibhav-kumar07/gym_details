import { Request, Response } from 'express';
import GymLegalInfoService from '../service/gymlegalinfo-service';

const registrationService = new GymLegalInfoService();

export const create = async (req: Request, res: Response) => {
  const legalInfo = await registrationService.createLegalInfo(req.body);
  res.status(201).json({
    status: true,
    data: legalInfo,
  });
}

export const getByGymId = async (req: Request, res: Response) => {
  const legalInfo = await registrationService.getLegalInfoByGymId(req.params.gymId);
  res.json({
    status: true,
    data: legalInfo,
  });
}

export const update = async (req: Request, res: Response) => {
  const legalInfo = await registrationService.updateLegalInfo(req.params.id, req.body);
  res.json({
    status: true,
    data: legalInfo,
  });
}

export const deleteLegalInfo = async (req: Request, res: Response) => {
  await registrationService.deleteLegalInfo(req.params.id);
  res.json({
    status: true,
    message: "Legal Info deleted successfully",
  });
}