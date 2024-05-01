import { Router } from "express";

import pingRoute from "./ping.route";
import eventRoute from "./event.route";

const router = Router();

router.use("/ping", pingRoute);
router.use("/event", eventRoute);

export default router;
