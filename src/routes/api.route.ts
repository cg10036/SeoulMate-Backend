import { Router } from "express";

import pingRoute from "./ping.route";
import eventRoute from "./event.route";
import parkingRoute from "./parking.route";
import chatRoute from "./chat.route";

const router = Router();

router.use("/ping", pingRoute);
router.use("/event", eventRoute);
router.use("/parking", parkingRoute);
router.use("/chat", chatRoute);

export default router;
