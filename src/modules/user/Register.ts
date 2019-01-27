/* 
RegisterResolver is the resolver created to operate on the USER table for any registration process.

It is responsible for running queries and mutations on the USER table
*/

import * as bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class RegisterResolver {
  // Define a default query to keep Graphql happy
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
  // Register mutation to create a new user in the USER DB
  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
