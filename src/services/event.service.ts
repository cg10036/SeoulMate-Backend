import { HttpResponse } from "../helpers/response.helper";
import { Event } from "../entities/Event";

const getEvents = async () => {
  return new HttpResponse(200, await Event.find());
};

export default {
  getEvents,
};
