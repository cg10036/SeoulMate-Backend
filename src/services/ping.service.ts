import { HttpResponse } from "../helpers/response.helper";

const ping = () => {
  return new HttpResponse(200, "pong");
};

export default { ping };
