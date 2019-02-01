/* 
RegisterInput defines the required data and its constraints for the registration process.
 */
import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  Length,
  MinLength
} from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyPresent } from "./IsEmailAlreadyPresent";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 16)
  @IsAlpha()
  firstName: string;

  @Field()
  @Length(1, 16)
  @IsAlpha()
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
  @IsAlphanumeric()
  password: string;
}
