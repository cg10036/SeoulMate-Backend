import { Length } from "class-validator";

export class DefaultAuthValidator {
  @Length(2, 10)
  username: string;

  @Length(4)
  password: string;
}

export class LoginValidator extends DefaultAuthValidator {}

export class RegisterValidator extends DefaultAuthValidator {}
