/* 
RegisterResolver operates on the USER table to create a new user.

We have a default query defined below keep Graphql happy. It expects atleast one query and hence this dummy query has been provided.
Register mutation creats a user in the USER table based on the values that have been provided while calling this resolver.
The fields firstName, lastName, email and password are required to make a call to this resolver in order to create a user.
Password gets encrupted using bcryptjs hashing algorithm while other values are passes on as-is.

Since we have two tokens being saved now, one for the forgot password and one for user confirmation, 
we should  be adding a prefix to the token to differentiate them when there is a need to retrieve
the tokens and the corresponding values. This is being passed along with the current flow to the SendEmail method.


Queries and Mutations to be used during the registration process are defined here.

It returns an object of entity type User.
*/

import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { USER_CONFIRMATION_PREFIX } from "../../constants/prefix";
import { User } from "../../entity/User";
import createEmailURL from "../../utils/email/create";
import { SendEmail } from "../../utils/email/send";
import { IsUserAuthenticated } from "../middleware/IsUserAuthenticated";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  // Define a default query to keep Graphql happy
  @UseMiddleware(IsUserAuthenticated)
  @Query(() => String)
  async defaultQueryToMakeGraphqlHappy() {
    return "Graphql is happy now!";
  }

  // Register mutation to create a new user in the USER DB
  // Validations and structure of the input is being read from RegisterInput
  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    // .create() cretes an User object
    // ,save() created an entry in the DB
    // Just calling .create() does not update the DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    // Once the user has been saved successfully, send the confirmation mail
    // email to send the mail to
    // prefix to differentiate what kind of token has been used
    // 'confirm' is the current flow which would be added to the mail
    SendEmail(
      email,
      await createEmailURL(user.id, USER_CONFIRMATION_PREFIX, "confirm")
    );

    return user;
  }
}
