import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  next(await authService.login(username, password));
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  next(await authService.register(username, password));
};

export default { login, register };
