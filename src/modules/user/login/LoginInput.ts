/* 
LoginInput defines the required data and its constraints for the login process.
 */
import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 18)
  password: string;
}
