/* 
RegisterInput defines the required data and its constraints for the registration process.
 */
import { IsEmail, Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyPresent } from "./IsEmailAlreadyPresent";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 16)
  firstName: string;

  @Field()
  @Length(1, 16)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyPresent({
    message:
      "Email $value is already registered in the system. Please use another email."
  })
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}
