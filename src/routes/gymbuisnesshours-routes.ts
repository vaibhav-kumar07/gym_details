import express from "express";
import * as controller from "../controller/gymbuisnesshours-controller";
import { authorizeRole } from "../middleware/authorizer.middleware";
import { validateRequest } from "../middleware/validateRequest.middleware";
import {
  createBusinessHoursSchema,
  updateBusinessHoursSchema,
} from "../validation/gymbuisnesshours-validation";

const router = express.Router();

router.post(
  "/",
  authorizeRole(["owner"]),
  validateRequest(createBusinessHoursSchema),

  controller.create
);
router.get("/:gymId", controller.getByGymId);
router.put(
  "/:id",
  authorizeRole(["owner"]),
  validateRequest(updateBusinessHoursSchema),
  controller.update
);
router.delete("/:id", authorizeRole(["owner"]), controller.deleteBusinessHours);

export default router;
