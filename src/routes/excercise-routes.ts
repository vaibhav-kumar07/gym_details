import express from 'express';
import * as controller from '../controller/excercise-controller';
import { authorizeRole } from '../middleware/authorizer.middleware';
import { validateRequest } from '../middleware/validateRequest.middleware';
import { createExerciseSchema, updateExerciseSchema } from '../validation/excercise-validation';   

const router = express.Router();

router.post('/', authorizeRole(['admin', 'owner',"trainer"]), validateRequest(createExerciseSchema), controller.create);
router.get('/:id', controller.getById);
router.get('/', controller.getAll);
router.post('/batch', controller.getByIds); // Assuming batch fetch by IDs
router.put('/:id', authorizeRole(['admin', 'owner',"trainer"]), validateRequest(updateExerciseSchema), controller.update);

export default router;