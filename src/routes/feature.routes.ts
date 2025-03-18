import express from "express";
import * as featureController from "../controller/feature-controller";
import { validateRequest } from "../middleware/validateRequest.middleware";
import {
  createFeatureSchema,
  updateFeatureSchema,
} from "../validation/feature-validation";
import { tryCatchHandler } from "../middleware/error.middleware";
import { authorizeRole } from "../middleware/authorizer.middleware";

const router = express.Router();
router.get("/", featureController.get);
router.get("/:id", featureController.getById);
router.post(
  "/",
  authorizeRole(["admin","owner"]),
  validateRequest(createFeatureSchema),
  tryCatchHandler(featureController.create)
);
router.put(
  "/:id",
  authorizeRole(["admin","owner"]),
  validateRequest(updateFeatureSchema),
  tryCatchHandler(featureController.update)
);

router.delete("/:id", authorizeRole(["admin","owner"]), tryCatchHandler(featureController.deleteFeature));

export default router;
