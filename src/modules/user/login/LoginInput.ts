/* 
LoginInput defines the required data and its constraints for the login process.

The fields email and password are required for login to be successful.
 */
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
