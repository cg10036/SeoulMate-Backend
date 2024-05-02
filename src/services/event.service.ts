import { HttpResponse } from "../helpers/response.helper";
import { Event } from "../entities/Event";
import { Comment } from "../entities/Comment";
import * as bcrypt from "bcrypt";

const getEvents = async () => {
  return new HttpResponse(200, await Event.find());
};

const getCategory = async () => {
  const category = await Event.find({ select: ["category"] });
  const result = Array.from(
    new Set(category.map((category) => category.category))
  );

  return new HttpResponse(200, result);
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
  const hashedPassword = await bcrypt.hash(password, 10);
  await Comment.insert({ eventId, name, password: hashedPassword, content });
  return new HttpResponse(201, "Comment added");
};

const getEventComments = async (eventId) => {
  console.log(await Comment.find({ where: { eventId } }[0]));
  return new HttpResponse(200, await Comment.find({ where: { eventId } }));
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
