import { Router } from "express";
import { validateBody, validateParams } from "../validators/validator";
import {
  CategoryParamsValidator,
  CommentParamsValidator,
  DeleteCommentBodyValidator,
  EditCommentBodyValidator,
  EventParamsValidator,
  NewCommentBodyValidator,
} from "../validators/event.validator";
import eventController from "../controllers/event.controller";

const router = Router();

router.get("/", eventController.getEvents); // 모든 행사 반환

router.get("/category", eventController.getCategory); // 행사 카테고리 반환
router.get(
  "/category/:category",
  validateParams(CategoryParamsValidator),
  eventController.getCategoryEvents
); // 해당 카테고리의 모든 행사 반환

router.get(
  "/:eventId",
  validateParams(EventParamsValidator),
  eventController.getEvent
); // 행사 반환
router.get(
  "/:eventId/comment",
  validateParams(EventParamsValidator),
  eventController.getEventComments
); // 행사의 모든 댓글 반환
router.post(
  "/:eventId/comment",
  validateParams(EventParamsValidator),
  validateBody(NewCommentBodyValidator),
  eventController.addComment
); // 행사에 댓글 추가
router.patch(
  "/:eventId/comment/:commentId",
  validateParams(CommentParamsValidator),
  validateBody(EditCommentBodyValidator),
  eventController.editComment
); // 행사의 댓글 수정
router.delete(
  "/:eventId/comment/:commentId",
  validateParams(CommentParamsValidator),
  validateBody(DeleteCommentBodyValidator),
  eventController.deleteComment
); // 행사의 댓글 삭제

export default router;
