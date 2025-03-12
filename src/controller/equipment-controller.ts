import { Request, Response } from 'express';
import EquipmentService from 'service/equipment-service';


const equipmentService = new EquipmentService();

export const create = async (req: Request, res: Response) => {
  const equipment = await equipmentService.createEquipment(req.body);
  res.status(201).json({
    status: true,
    data: equipment,
  });
}

export const createCustom = async (req: Request, res: Response) => {
  const equipment = await equipmentService.createCustomEquipment(req.body);
  res.status(201).json({
    status: true,
    data: equipment,
  });
}

export const getById = async (req: Request, res: Response) => {
  const equipment = await equipmentService.getEquipmentById(req.params.id);
  res.json({
    status: true,
    data: equipment,
  });
}

export const getByName = async (req: Request, res: Response) => {
  const equipment = await equipmentService.getEquipmentByName(req.params.name, req.query.gymId as string);
  res.json({
    status: true,
    data: equipment,
  });
}

export const getAll = async (req: Request, res: Response) => {
  const equipmentList = await equipmentService.getAllEquipment(req.query.gymId as string);
  res.json({
    status: true,
    data: equipmentList,
  });
}

export const update = async (req: Request, res: Response) => {
  const equipment = await equipmentService.updateEquipment(req.params.id, req.body);
  res.json({
    status: true,
    data: equipment,
  });
}