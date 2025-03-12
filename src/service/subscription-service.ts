
import { ISubscription } from "types/subscription-types";
import { SubscriptionPlanRepository } from "@database/repositories/subscription-repo";
import { throwBusinessError } from "@utils/error.utils";

export default class SubscriptionPlanService {
  private _subscriptionPlanRepo = new SubscriptionPlanRepository();

  async createSubscriptionPlan(data: ISubscription): Promise<ISubscription> {
    const existingPlan = await this._subscriptionPlanRepo.findByName(data.name);
    throwBusinessError(!!existingPlan, `Subscription Plan already exists`);
    return await this._subscriptionPlanRepo.create(data);
  }

  async getAllSubscriptionPlans(isAdmin: boolean = false) {
    const query = isAdmin ? {} : { isActive: true };
    return await this._subscriptionPlanRepo.get(query);
  }

  async getSubscriptionPlanById(id: string): Promise<ISubscription | null> {
    return await this._subscriptionPlanRepo.findById(id);
  }

  async updateSubscriptionPlan(id: string, data: Partial<ISubscription>): Promise<ISubscription | null> {
    const plan = await this.getSubscriptionPlanById(id);
    throwBusinessError(!plan, `Subscription Plan with ID ${id} not found`);
    return await this._subscriptionPlanRepo.update(id, data);
  }

  async deleteSubscriptionPlan(id: string) {
    await this._subscriptionPlanRepo.deactivate(id);
  }
}