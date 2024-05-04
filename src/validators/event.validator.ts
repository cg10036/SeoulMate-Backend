import { Type } from "class-transformer";
import { IsInt, IsString, Length } from "class-validator";

export class CategoryParamsValidator {
  @IsString()
  category: string;
}

export class EventParamsValidator {
  @IsInt()
  @Type(() => Number)
  eventId: number;
}

export class CommentParamsValidator extends EventParamsValidator {
  @IsInt()
  @Type(() => Number)
  commentId: number;
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
