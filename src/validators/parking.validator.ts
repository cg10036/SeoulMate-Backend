import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class CategoryParamsValidator {
  @IsInt()
  @Type(() => Number)
  category: number;
}
