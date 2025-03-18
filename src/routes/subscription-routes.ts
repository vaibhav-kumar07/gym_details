import express from 'express';
import * as controller from '../controller/subscription-controller';
import { authorizeRole } from '../middleware/authorizer.middleware';
import { validateRequest } from '../middleware/validateRequest.middleware';
import { createPlanSchema, updatePlanSchema } from '../validation/subscription-validation';     

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authorizeRole(['admin',"owner"]), validateRequest(createPlanSchema), controller.create);
router.put('/:id', authorizeRole(['admin',"owner"]), validateRequest(updatePlanSchema), controller.update);
router.delete('/:id', authorizeRole(['admin',"owner"]), controller.deletePlan);

export default router;