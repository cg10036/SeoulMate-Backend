import { HttpResponse } from "../helpers/response.helper";
import { Parking } from "../entities/Parking";

const getParking = async () => {
  return new HttpResponse(200, await Parking.find());
};

export default {
  getParking,
};
