import { Router } from "express";

import pingController from "../controllers/ping.controller";

const router = Router();

router.post("/ping", pingController.ping);

export default router;
