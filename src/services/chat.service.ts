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
      end: new FindOperator("moreThanOrEqual", new Date()),
    },
  });

  let parser = new Parser({ fields });

  let resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.ANTHROPIC_API_KEY,
      "Anthropic-Version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      system:
        `You are a Seoul Festival Guide affiliated with "SeoulMate" and your name is "SeoulMate AI". Do your best to guide the user through the given data.\n` +
        "Answer in the language the user entered, but preferably in Korean.\n" +
        "Always keep the format {FullName}<ID> when outputting the event. FullName MUST NOT BE MODIFIED\n" +
        `The current date is ${moment
          .tz("Asia/Seoul")
          .format("YYYY-MM-DD HH:mm:ss")}\n\n${parser.parse(data)}`,
      messages: messages,
    }),
  });
  let json = await resp.json();
  return new HttpResponse(200, {
    role: json.role,
    content: json.content[0].text,
  });
};

export default {
  chat,
};
