import { Router } from "express";

import apiRoute from "./api.route";

const router = Router();

router.use("/api", apiRoute);

export default router;
