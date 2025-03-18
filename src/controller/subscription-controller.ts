import { Request, Response } from 'express';
import SubscriptionPlanService from '../service/subscription-service';
import { tryCatchHandler } from '../middleware/error.middleware';

const subscriptionPlanService = new SubscriptionPlanService();

export const create = tryCatchHandler(async (req: Request, res: Response) => {
  const plan = await subscriptionPlanService.createSubscriptionPlan(req.body);
  res.status(201).json({
    status: true,
    data: plan,
  });
});

export const getAll = tryCatchHandler(async (req: Request, res: Response) => {
  const isAdmin = req.body.loggedInUser?.role === "admin";
  const plans = await subscriptionPlanService.getAllSubscriptionPlans(isAdmin);
  res.json({
    status: true,
    data: plans,
  });
});

export const getById = tryCatchHandler(async (req: Request, res: Response) => {
  const plan = await subscriptionPlanService.getSubscriptionPlanById(req.params.id);
  res.json({
    status: true,
    data: plan,
  });
});

export const update = tryCatchHandler(async (req: Request, res: Response) => {
  const plan = await subscriptionPlanService.updateSubscriptionPlan(req.params.id, req.body);
  res.json({
    status: true,
    data: plan,
  });
});

export const deletePlan = tryCatchHandler(async (req: Request, res: Response) => {
  await subscriptionPlanService.deleteSubscriptionPlan(req.params.id);
  res.json({
    status: true,
    message: "Subscription Plan deleted successfully",
  });
});