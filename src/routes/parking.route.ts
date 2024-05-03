import { Router } from "express";

import parkingController from "../controllers/parking.controller";
import { validateParams } from "../validators/validator";
import { CategoryParamsValidator } from "../validators/parking.validator";

const router = Router();

router.get("/", parkingController.getParking);
router.get("/category", parkingController.getCategory);
router.get(
  "/category/:category",
  validateParams(CategoryParamsValidator),
  parkingController.getCategoryParking
);

export default router;
