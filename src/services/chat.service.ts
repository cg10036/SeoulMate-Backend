import { HttpResponse } from "../helpers/response.helper";
import { Event } from "../entities/Event";
import { FindOperator } from "typeorm";
import fetch from "node-fetch";
import { Parser } from "json2csv";
import * as moment from "moment-timezone";
import { Message } from "../validators/chat.validator";

const chat = async (messages: Message[]) => {
  let fields = [
    "id",
    "title",
    // "category",
    // "price",
    "isFree",
    "start",
    "end",
    // "target",
    // "place",
  ];
  let data = await Event.find({
    where: {
      title: new FindOperator("like", "[%"),
      end: new FindOperator("moreThanOrEqual", new Date()),
    },
  });

  let parser = new Parser({ fields });

  let resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a Seoul Festival Guide. Do your best to guide the user through the given data.\n" +
            "Answer in the language the user entered, but preferably in Korean.\n" +
            "Always keep the format {Name}<ID> when outputting the event. Example: {한강 축제}<142345>\n" +
            `The current date is ${moment
              .tz("Asia/Seoul")
              .format("YYYY-MM-DD HH:mm:ss")}`,
        },
        {
          role: "system",
          content: parser.parse(data),
        },
        ...messages,
      ],
    }),
  });
  let json = await resp.json();

  return new HttpResponse(200, json.choices[0].message);
};

export default {
  chat,
};
