import { validate } from "class-validator";

const validateBody = async (type: any) => {
  return async (req: any, res: any, next: any) => {
    const errors = await validate(Object.assign(new type(), req.body));
    if (errors.length > 0) {
      res.status(400).send(errors);
    } else {
      next();
    }
  };
};

export { validateBody };
