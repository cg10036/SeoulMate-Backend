import { Type } from "class-transformer";
import { IsArray, IsIn, IsString, ValidateNested } from "class-validator";

export const Roles = ["assistant", "user"] as const;
export type RoleType = (typeof Roles)[number];

export class Message {
  @IsIn(Roles)
  role: RoleType;

  @IsString()
  content: string;
}

export class ChatBodyValidator {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages: Message[];
}
