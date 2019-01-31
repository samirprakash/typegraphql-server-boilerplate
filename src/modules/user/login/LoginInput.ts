/* 
LoginInput defines the required data and its constraints for the login process.
 */
import { IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}
