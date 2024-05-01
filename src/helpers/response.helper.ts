import { NextFunction, Request, Response } from "express";

class HttpResponse {
  status: number;
  data: string | object;
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpResponse) {
    res.status(err.status);
    if (typeof err.data === "string") {
      return res.send(err.data);
    }
    return res.json(err.data);
  }

  console.log(err);
  return res.status(500).send("Internal Server Error");
};

export { HttpResponse, errorHandler };
