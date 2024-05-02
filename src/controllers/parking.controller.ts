import { NextFunction, Request, Response } from "express";
import parkingService from "../services/parking.service";

const getParking = async (req: Request, res: Response, next: NextFunction) => {
  next(await parkingService.getParking());
};

export default {
  getParking,
};
