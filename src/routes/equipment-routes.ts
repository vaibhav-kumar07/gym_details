import express from 'express';
import * as controller from 'controller/equipment-controller';
import { authorizeRole } from '@middleware/authorizer.middleware';
import { validateRequest } from '@middleware/validateRequest.middleware';
import { createEquipmentSchema, updateEquipmentSchema } from 'validation/equipment-validation';

const router = express.Router();

router.post('/create', authorizeRole(['admin', 'owner']), validateRequest(createEquipmentSchema), controller.create);
router.post('/createCustom/:gymId', authorizeRole(['owner',"admin","trainer"]), validateRequest(createEquipmentSchema), controller.createCustom);
router.get('/get/:id', controller.getById);
router.get('/getByName', controller.getByName); // Assuming name is passed as a query parameter
router.get('/getAll', controller.getAll);
router.put('/update/:id', authorizeRole(['admin', 'owner']), validateRequest(updateEquipmentSchema), controller.update);

export default router;