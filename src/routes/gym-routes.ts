import express from 'express';
import * as controller from '@controller/gym-controller';
import { authorizeRole } from '@middleware/authorizer.middleware';
import { validateRequest } from '@middleware/validateRequest.middleware';
import { createGymSchema, updateGymSchema } from '@validation/gym-validation';

const router = express.Router();

router.post('/', authorizeRole(['owner', 'admin']), validateRequest(createGymSchema), controller.create);
router.patch('/:gymId', authorizeRole(['owner', 'admin']), validateRequest(updateGymSchema), controller.update);
router.delete('/:gymId', authorizeRole(['owner', 'admin']), controller.softDelete);
router.get('/', controller.getAll);
router.get('/:gymId', controller.getById);
router.get('/owned', authorizeRole(['owner']), controller.getOwnedByUser);
router.patch('/:gymId/status', authorizeRole(['owner', 'admin']), controller.changeStatus);
router.get('/:gymId/access', authorizeRole(['member']), controller.checkAccess);
router.get('/:gymId/features', controller.listFeatures);

export default router;