import { HttpResponse } from "../helpers/response.helper";
import * as bcrypt from "bcrypt";
import { User } from "../entities/User";

const SALT = 12;

const login = async (username, password) => {
  let user = await User.findOneBy({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new HttpResponse(401, "WRONG_USER_OR_PASSWORD");
  }
  return new HttpResponse(200, "LOGIN_SUCCESS");
};

const register = async (username, password) => {
  let user = new User();
  user.username = username;
  user.password = await bcrypt.hash(password, SALT);

  try {
    await user.save();
  } catch (err) {
    if (err.code === "23505") {
      return new HttpResponse(400, "USERNAME_ALREADY_EXISTS");
    }
    throw err;
  }
  return new HttpResponse(201, "REGISTER_SUCCESS");
};

export default { login, register };
