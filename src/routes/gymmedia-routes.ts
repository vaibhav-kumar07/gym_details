import express from 'express';
import * as controller from '@controller/gymmedia-controller';   
import { authorizeRole } from '@middleware/authorizer.middleware';
import { validateRequest } from '@middleware/validateRequest.middleware';
import { createMediaSchema, updateMediaSchema } from '@validation/gymmedia-validation';
import { tryCatchHandler } from '@middleware/error.middleware';
const router = express.Router();

router.post('/', authorizeRole(['owner']), validateRequest(createMediaSchema), tryCatchHandler(controller.create));
router.get('/:gymId', tryCatchHandler(controller.getByGymId));
router.put('/:id', authorizeRole(['owner']), validateRequest(updateMediaSchema), tryCatchHandler(controller.update));
router.delete('/:id', authorizeRole(['owner']), tryCatchHandler(controller.deleteMedia));

export default router;