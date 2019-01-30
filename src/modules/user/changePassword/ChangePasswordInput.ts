/* 
ChangePasswordInout defines the required data and its constraints for the change password process.
 */
import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  @Length(6, 18)
  password: string;
}
