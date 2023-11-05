import { Router } from "express";

import authRoute from "./auth.route";
import pingRoute from "./ping.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/ping", pingRoute);

export default router;
