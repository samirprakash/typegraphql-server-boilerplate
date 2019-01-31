/* 
ChangePasswordInout defines the required data and its constraints for the change password process.
 */
import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  @MinLength(6)
  password: string;
}
