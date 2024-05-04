import { NextFunction, Request, Response } from "express";
import chatService from "../services/chat.service";
import { ChatBodyValidator } from "../validators/chat.validator";

const chat = async (
  req: Request<any, any, ChatBodyValidator>,
  res: Response,
  next: NextFunction
) => {
  let { messages } = req.body;
  next(await chatService.chat(messages));
};

export default {
  chat,
};
