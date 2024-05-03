import { NextFunction, Request, Response } from "express";
import parkingService from "../services/parking.service";
import { CategoryParamsValidator } from "../validators/parking.validator";

const getParking = async (req: Request, res: Response, next: NextFunction) => {
  next(await parkingService.getParking());
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  next(await parkingService.getCategory());
};

const getCategoryParking = async (
  req: Request<CategoryParamsValidator>,
  res: Response,
  next: NextFunction
) => {
  let { category } = req.params;
  next(await parkingService.getCategoryParking(category));
};

export default {
  getCategory,
  getCategoryParking,
  getParking,
};
