import { Router } from "express";

import parkingController from "../controllers/parking.controller";

const router = Router();

router.get("/", parkingController.getParking);

export default router;
