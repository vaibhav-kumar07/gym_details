///write only gym related featuresroutes only
import express from "express";
import * as gymController from "../controller/gymfeatures-controller";

const router = express.Router();

router.post("/:gymId", gymController.assignFeaturesToGym);
router.put("/:gymId", gymController.unassignFeaturesFromGym);
router.get("/:gymId", gymController.getGymFeatures);

export default router;
