import { HttpResponse } from "../helpers/response.helper";
import { Event } from "../entities/Event";
import { Comment } from "../entities/Comment";
import * as bcrypt from "bcrypt";
import fetch from "node-fetch";

const getEvents = async () => {
  return new HttpResponse(200, await Event.find());
};

const getCategory = async () => {
  let data: { category: string }[] = await Event.createQueryBuilder("event")
    .select("category")
    .distinctOn(["category"])
    .orderBy("category")
    .getRawMany();
  return new HttpResponse(
    200,
    data.map((e) => e.category)
  );
};

const getCategoryEvents = async (category) => {
  return new HttpResponse(
    200,
    await Event.find({ where: { category: category } })
  );
};

const getEvent = async (eventId) => {
  return new HttpResponse(200, await Event.findOne({ where: { id: eventId } }));
};

const addComment = async (eventId, name, password, content) => {
  try {
    let controller = new AbortController();
    let timeout = setTimeout(() => controller.abort(), 5000);
    let resp = await fetch(process.env.AI_API_URL, {
      signal: controller.signal,
      method: "POST",
      body: content,
    });
    clearTimeout(timeout);
    let { result } = await resp.json();
    if (result) {
      return new HttpResponse(403, "Comment contains inappropriate content");
    }
  } catch (err) {
    console.log(err);
  }
  await Comment.insert({
    eventId,
    name,
    password: await bcrypt.hash(password, 10),
    content,
  });
  return new HttpResponse(201, "Comment added");
};

const getEventComments = async (eventId) => {
  return new HttpResponse(
    200,
    await Comment.find({
      where: {
        eventId,
      },
      order: { createdAt: "ASC" },
    })
  );
};

const editComment = async (eventId, commentId, content, password) => {
  const comment = await Comment.findOne({ where: { id: commentId } });
  if (!comment) {
    return new HttpResponse(404, "Comment not found");
  } // 해당 하는 댓글이 없는 경우
  if (!(await bcrypt.compare(password, comment.password))) {
    return new HttpResponse(401, "Password not correct");
  } // 입력한 비밀번호가 일치하지 않은 경우

  await Comment.update({ id: commentId }, { content: content });

  return new HttpResponse(200, "Comment Updated"); // update 성공 했을 때
};

const deleteComment = async (eventId, commentId, password) => {
  const comment = await Comment.findOne({ where: { id: commentId } });
  if (!comment) {
    return new HttpResponse(404, "Comment not found");
  } // 해당 댓글이 없는 경우

  if (!(await bcrypt.compare(password, comment.password))) {
    return new HttpResponse(401, "Password not correct");
  } // 비밀번호 일치 X

  await Comment.delete({ id: commentId });

  return new HttpResponse(200, "Comment Deleted"); // delete 성공 했을 때
};

export default {
  getEvents,
  getCategory,
  getEvent,
  addComment,
  getEventComments,
  editComment,
  deleteComment,
  getCategoryEvents,
};
