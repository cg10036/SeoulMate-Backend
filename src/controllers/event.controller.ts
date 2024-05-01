import { NextFunction, Request, Response } from "express";
import {
  CategoryParamsValidator,
  CommentParamsValidator,
  EditCommentBodyValidator,
  EventParamsValidator,
  NewCommentBodyValidator,
} from "../validators/event.validator";
import eventService from "../services/event.service";

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  next(await eventService.getEvents());
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  // next(await eventService.getCategory())
};

const getCategoryEvents = async (
  req: Request<CategoryParamsValidator>,
  res: Response,
  next: NextFunction
) => {
  let { category } = req.params;
  // next(await eventService.getCategoryEvents(category))
};

const getEvent = async (
  req: Request<EventParamsValidator>,
  res: Response,
  next: NextFunction
) => {
  let { eventId } = req.params;
  // next(await eventService.getEvent(eventId))
};

const getEventComments = async (
  req: Request<EventParamsValidator>,
  res: Response,
  next: NextFunction
) => {
  let { eventId } = req.params;
  // next(await eventService.getEventComments(eventId))
};

const addComment = async (
  req: Request<EventParamsValidator, any, NewCommentBodyValidator>,
  res: Response,
  next: NextFunction
) => {
  let { eventId } = req.params;
  let { name, password, content } = req.body;
  // next(await eventService.addComment(eventId, name, password, content))
};

const editComment = async (
  req: Request<CommentParamsValidator, any, EditCommentBodyValidator>,
  res: Response,
  next: NextFunction
) => {
  let { eventId, commentId } = req.params;
  let { content, password } = req.body;
  // next(await eventService.editComment(eventId, commentId, content, password))
};

const deleteComment = async (
  req: Request<CommentParamsValidator>,
  res: Response,
  next: NextFunction
) => {
  let { eventId, commentId } = req.params;
  let { password } = req.body;
  // next(await eventService.deleteComment(eventId, commentId, password))
};

export default {
  getEvents,
  getCategory,
  getCategoryEvents,
  getEvent,
  getEventComments,
  addComment,
  editComment,
  deleteComment,
};
