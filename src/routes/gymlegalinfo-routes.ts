import express from 'express';
import * as controller from '@controller/gymlegalinfo-controller';
import { authorizeRole } from '@middleware/authorizer.middleware';
import { validateRequest } from '@middleware/validateRequest.middleware';
import { createLegalInfoSchema, updateLegalInfoSchema } from '@validation/gymlegalinfo-validation';  
import { tryCatchHandler } from '@middleware/error.middleware';

const router = express.Router();

        router.post('/', authorizeRole(['owner']), validateRequest(createLegalInfoSchema),tryCatchHandler(controller.create));
router.get('/:gymId', tryCatchHandler(controller.getByGymId));
router.put('/:id', authorizeRole(['owner']), validateRequest(updateLegalInfoSchema), tryCatchHandler(controller.update));
router.delete('/:id', authorizeRole(['owner']), tryCatchHandler(controller.deleteLegalInfo));

export default router;