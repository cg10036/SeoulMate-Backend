import { HttpResponse } from "../helpers/response.helper";
import { Parking } from "../entities/Parking";

const getParking = async () => {
  return new HttpResponse(200, await Parking.find());
};

const getCategory = async () => {
  let data: { parking_rule: string; parking_ruleCode: number }[] =
    await Parking.createQueryBuilder("parking")
      .select(["parking.rule", "parking.ruleCode"])
      .distinctOn(["parking.rule", "parking.ruleCode"])
      .orderBy("parking.ruleCode")
      .getRawMany();
  return new HttpResponse(
    200,
    data.map((e) => ({ code: e.parking_ruleCode, name: e.parking_rule }))
  );
};

const getCategoryParking = async (category: number) => {
  return new HttpResponse(
    200,
    await Parking.find({ where: { ruleCode: category } })
  );
};

export default {
  getCategory,
  getCategoryParking,
  getParking,
};
