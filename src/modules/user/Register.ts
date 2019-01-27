/* 
RegisterResolver operates on the USER table to fetch or modify the table content.

Queries and Mutations to be used during the registration process are defined here.
*/

import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  // Define a default query to keep Graphql happy
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
  // Register mutation to create a new user in the USER DB
  // Validations and strcuture of the input is being read from RegisterInput
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

    return user;
  }
}
