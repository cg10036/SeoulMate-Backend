import { IsString, Length } from "class-validator";

export class CategoryParamsValidator {
  @IsString()
  category: string;
}

export class EventParamsValidator {
  @IsString()
  eventId: string;
}

export class CommentParamsValidator extends EventParamsValidator {
  @IsString()
  commentId: string;
}

export class NewCommentBodyValidator {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @Length(1, 100)
  content: string;
}

export class EditCommentBodyValidator {
  @IsString()
  password: string;

  @Length(1, 100)
  content: string;
}

export class DeleteCommentBodyValidator {
  @IsString()
  password: string;
}

export class PasswordBodyValidator {
  @IsString()
  password: string;
}
