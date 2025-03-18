import { ISubscription } from "../../types/subscription-types";
import SubscriptionPlan from '../../model/subscription.model';
import { Types } from 'mongoose';

export class SubscriptionPlanRepository {
  async save(planData: Partial<ISubscription>, isNew: boolean = true): Promise<ISubscription> {
    const plan = new SubscriptionPlan(planData);
    plan.isNew = isNew;
    return (await plan.save()).toObject();
  }

  async create(planData: Partial<ISubscription>): Promise<ISubscription> {
    return this.save(planData);
  }

  async get(filter: { isActive?: boolean } = {}): Promise<ISubscription[]> {
    return SubscriptionPlan.find(filter);
  }

  async findById(id: string): Promise<ISubscription | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return SubscriptionPlan.findById(id).lean();
  }

  async findByName(name: string): Promise<ISubscription | null> {
    return SubscriptionPlan.findOne({ name }).lean();
  }

  async update(id: string, updateData: Partial<ISubscription>): Promise<ISubscription | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return SubscriptionPlan.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
  }

  async deactivate(id: string) {
    const plan = await this.findById(id);
    if (plan) {
      plan.isActive = false;
      await this.save(plan, false);
    }
  }
}