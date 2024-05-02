import { Router } from "express";

import pingRoute from "./ping.route";
import eventRoute from "./event.route";
import parkingRoute from "./parking.route";

const router = Router();

router.use("/ping", pingRoute);
router.use("/event", eventRoute);
router.use("/parking", parkingRoute);

export default router;
