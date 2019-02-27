/* 
RegisterResolver operates on the USER table to create a new user.

We have a default query defined below to keep Graphql happy. It expects atleast one query and hence this dummy query has been provided.

Register mutation takes firstName, lastName, email and password which are the required fields to create a new user. 
These fields are defined in a custom input i.e. RegisterInput. Password gets encrypted using bcryptjs hashing algorithm while other values are passed on as-is.

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
  // Graphql expects atleast one query defined

  // Custom middleware to execute a query only when an autheticated user is logged in
  // This middleware should be added to all secure paths in the user flow
  @UseMiddleware(IsUserAuthenticated)
  @Query(() => String)
  async defaultQueryToMakeGraphqlHappy() {
    return "Graphql is happy now!";
  }

  // Register mutation to create a new user in the USER DB
  // Validations and structure of the input is being read from RegisterInput
  // We are spreading out RegisterInput to read the fields
  @Mutation(() => User)
  async register(@Arg("data")
  {
    firstName,
    lastName,
    email,
    password,
  }: RegisterInput): Promise<User> {
    // Encrupt user password to generate a hashed password for enhanced security
    const hashedPassword = await bcrypt.hash(password, 12);

    // .create() creates an User object
    // ,save() created an entry in the DB
    // Just calling .create() does not update the DB
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    // Once the user has been saved successfully, send the confirmation mail
    // User needs to click on the confirmation mail link to complete the registration process
    // At this point of time, user is created in DB but is not activated
    // User would not be able to access GUI unless the confirmation has happened
    await SendEmail(
      email,
      await createEmailURL(user.id, USER_CONFIRMATION_PREFIX, "confirm"),
    );

    return user;
  }
}
