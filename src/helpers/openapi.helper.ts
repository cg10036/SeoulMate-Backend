// import "dotenv/config";
// import { AppDataSource } from "../data-source";
import fetch from "node-fetch";
import { Event } from "../entities/Event";
import { Parking } from "../entities/Parking";

interface CulturalEventData {
  TITLE: string;
  CODENAME: string;
  ORG_NAME: string;
  USE_FEE?: string;
  IS_FREE: string;
  MAIN_IMG: string;
  STRTDATE: string;
  END_DATE: string;
  LAT: string;
  LOT: string;
  USE_TRGT: string;
  PLACE: string;
  HMPG_ADDR: string;
}

interface CulturalEventInfo {
  list_total_count: number;
  RESULT: {
    CODE: string;
    MESSAGE: string;
  };
  row: CulturalEventData[];
}

interface CulturalEventInfoResponse {
  culturalEventInfo?: CulturalEventInfo;
  RESULT?: {
    CODE: string;
    MESSAGE: string;
  };
}

interface ParkInfoData {
  PARKING_CODE: string;
  PARKING_NAME: string;
  ADDR: string;
  OPERATION_RULE_NM: string;
  LAT: string;
  LNG: string;
}

interface GetParkInfo {
  list_total_count: number;
  RESULT: {
    CODE: string;
    MESSAGE: string;
  };
  row: ParkInfoData[];
}

interface GetParkInfoResponse {
  GetParkInfo?: GetParkInfo;
  RESULT?: {
    CODE: string;
    MESSAGE: string;
  };
}

const isFloat = (s: string) => !Number.isNaN(Number(s));

const getEventFromOpenAPI = async (): Promise<CulturalEventData[]> => {
  let data: CulturalEventData[] = [];

  for (let idx = 1; ; idx += 1000) {
    let resp = await fetch(
      `http://openapi.seoul.go.kr:8088/${
        process.env.OPENAPI_KEY
      }/json/culturalEventInfo/${idx}/${idx + 999}`
    );
    let { culturalEventInfo, RESULT: result } =
      (await resp.json()) as CulturalEventInfoResponse;
    if (!culturalEventInfo || !culturalEventInfo.row) {
      if (!result) {
        throw new Error("OpenAPI: Unknown error");
      }
      if (result.CODE === "INFO-200") {
        break;
      }
      throw new Error("OpenAPI: " + result.CODE + result.MESSAGE);
    }
    data.push(
      ...culturalEventInfo.row
        .map((e) => {
          for (let key of Object.keys(e)) {
            if (e[key]?.length === 0) {
              delete e[key];
            }
          }
          return e;
        })
        .filter(
          (e) =>
            e.TITLE &&
            e.CODENAME &&
            e.ORG_NAME &&
            e.IS_FREE &&
            e.MAIN_IMG &&
            e.STRTDATE &&
            e.END_DATE &&
            isFloat(e.LAT) &&
            isFloat(e.LOT) &&
            e.USE_TRGT &&
            e.PLACE &&
            e.HMPG_ADDR
        )
    );
  }

  return data;
};

const getParkingFromOpenAPI = async (): Promise<ParkInfoData[]> => {
  let data: ParkInfoData[] = [];

  for (let idx = 1; ; idx += 1000) {
    let resp = await fetch(
      `http://openapi.seoul.go.kr:8088/${
        process.env.OPENAPI_KEY
      }/json/GetParkInfo/${idx}/${idx + 999}`
    );
    let { GetParkInfo, RESULT: result } =
      (await resp.json()) as GetParkInfoResponse;
    if (!GetParkInfo || !GetParkInfo.row) {
      if (!result) {
        throw new Error("OpenAPI: Unknown error");
      }
      if (result.CODE === "INFO-200") {
        break;
      }
      throw new Error("OpenAPI: " + result.CODE + result.MESSAGE);
    }
    data.push(
      ...GetParkInfo.row
        .map((e) => {
          for (let key of Object.keys(e)) {
            if (e[key]?.length === 0) {
              delete e[key];
            }
          }
          return e;
        })
        .filter(
          (e) =>
            e.PARKING_CODE &&
            e.PARKING_NAME &&
            e.ADDR &&
            e.OPERATION_RULE_NM &&
            isFloat(e.LAT) &&
            isFloat(e.LNG)
        )
    );
  }

  return data;
};

const updateEventFromOpenAPI = async () => {
  const data = await getEventFromOpenAPI();

  await Promise.all(
    data.map(async (e): Promise<Event> => {
      let event = new Event();
      let id = Number.parseInt(
        new URL(e.HMPG_ADDR).searchParams.get("cultcode")
      );
      if (Number.isNaN(id)) {
        return;
      }

      event.id = id;
      event.title = e.TITLE;
      event.category = e.CODENAME;
      event.organization = e.ORG_NAME;
      event.price = e.USE_FEE;
      event.isFree = e.IS_FREE === "무료";
      event.image = e.MAIN_IMG;
      event.start = new Date(e.STRTDATE);
      event.end = new Date(e.END_DATE);
      event.latitude = e.LAT;
      event.longitude = e.LOT;
      event.target = e.USE_TRGT;
      event.place = e.PLACE;
      event.url = e.HMPG_ADDR;

      await Event.upsert(event, { conflictPaths: { id: true } });
    })
  );
};

const updateParkingFromOpenAPI = async () => {
  const data = await getParkingFromOpenAPI();

  await Promise.all(
    data.map(async (e): Promise<Event> => {
      let parking = new Parking();
      let id = Number.parseInt(e.PARKING_CODE);
      if (Number.isNaN(id)) {
        return;
      }

      parking.id = id;
      parking.name = e.PARKING_NAME;
      parking.address = e.ADDR;
      parking.rule = e.OPERATION_RULE_NM;
      parking.latitude = e.LAT;
      parking.longitude = e.LNG;

      await Parking.upsert(parking, { conflictPaths: { id: true } });
    })
  );
};

const runDaemon = async () => {
  console.log("Wait for initializing...");
  await updateEventFromOpenAPI();
  await updateParkingFromOpenAPI();
  console.log("Initialized");
  setInterval(async () => {
    try {
      await updateEventFromOpenAPI();
      await updateParkingFromOpenAPI();
    } catch (e) {
      console.error(e);
    }
  }, 1 * 60 * 60 * 1000);
};

export default {
  runDaemon,
};

// AppDataSource.initialize().then(async () => {
//   console.log(await updateParkingFromOpenAPI());
// });
