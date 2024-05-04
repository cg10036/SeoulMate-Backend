import { Router } from "express";
import chatController from "../controllers/chat.controller";
import { validateBody } from "../validators/validator";
import { ChatBodyValidator } from "../validators/chat.validator";

const router = Router();

router.post("/", validateBody(ChatBodyValidator), chatController.chat);

export default router;
