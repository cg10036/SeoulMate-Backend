import { Request, Response, NextFunction } from "express";
import pingService from "../services/ping.service";

const ping = async (req: Request, res: Response, next: NextFunction) => {
  next(pingService.ping());
};

export default { ping };
