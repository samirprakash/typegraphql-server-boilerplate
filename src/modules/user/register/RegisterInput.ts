/* 
RegisterInput defines the required data and its constraints for the registration process.

The fields firstName, lastName, email and password are required for registration to be successful.
We also have validations added to the fields such as max and min length requirements,
checking if the email is valid or not, and adding custom constraint such as to check if the email being used
is already present in our DB or not.

Custom messages can be generated from the endpoints to return back to the GUI for better UX.

 */
import { IsEmail, Length } from "class-validator";
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
  password: string;
}
