import { Request, Response } from "express";
import FeatureService from "@service/feature.service";

const featureService = new FeatureService();

// Admin Controllers
export async function create(req: Request, res: Response) {
  const feature = await featureService.createFeature(req.body);
  res.status(201).json({
    status: true,
    data: feature,
  });
}

export async function get(req: Request, res: Response) {
  const isAdmin = req.body.loggedInUser?.role === "admin";
  const features = await featureService.getAllFeatures(isAdmin);
  res.json({
    status: true,
    data: features,
  });
}

export async function getById(req: Request, res: Response) {
  const feature = await featureService.getFeatureById(req.params.id);
  res.json({
    status: true,
    data: feature,
  });
}
export async function update(req: Request, res: Response) {
  const feature = await featureService.updateFeature(req.params.id, req.body);

  res.json({
    status: true,
    data: feature,
  });
}

export async function deleteFeature(req: Request, res: Response) {
  await featureService.deleteFeature(req.params.id);
  res.json({
    status: true,
    message: "Feature deleted successfully",
  });
}
