import { Request, Response } from 'express';
import GymMediaService from '../service/gymmedia-service';

const mediaService = new GymMediaService();

export const create = async (req: Request, res: Response) => {
  const media = await mediaService.createMedia(req.body);
  res.status(201).json({
    status: true,
    data: media,
  });
}

export const getByGymId = async (req: Request, res: Response) => {
  const media = await mediaService.getMediaByGymId(req.params.gymId);
  res.json({
    status: true,
    data: media,
  });
}

export const update = async (req: Request, res: Response) => {
  const media = await mediaService.updateMedia(req.params.id, req.body);
  res.json({
    status: true,
    data: media,
  });
  }

export const deleteMedia = async (req: Request, res: Response) => {
  await mediaService.deleteMedia(req.params.id);
  res.json({
    status: true,
    message: "Media deleted successfully",
  });
}