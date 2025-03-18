import { Request, Response } from "express";
import GymFeatureService from "../service/gymfeature-service";
const gymFeatureService = new GymFeatureService();

export async function assignFeaturesToGym(req: Request, res: Response) {
  const { gymId } = req.params;
  const { featureIds } = req.body;
  await gymFeatureService.assignFeaturesToGym(gymId, featureIds);
  res.json({
    status: true,
    message: "Features assigned to gym successfully",
  });
}

//unassign features from gym
export async function unassignFeaturesFromGym(req: Request, res: Response) {
  const { gymId } = req.params;
  const { featureIds } = req.body;
  await gymFeatureService.unassignFeaturesFromGym(gymId, featureIds);
  res.json({
    status: true,
    message: "Features unassigned from gym successfully",
  });
}

export async function getGymFeatures(req: Request, res: Response) {
  const { gymId } = req.params;
  const features = await gymFeatureService.getGymFeatures(gymId);
  res.json({
    status: true,
    data: features,
  });
}
