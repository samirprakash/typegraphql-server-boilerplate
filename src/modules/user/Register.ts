/* 
RegisterResolver operates on the USER table to create a new user.

We have a default query defined below keep Graphql happy. It expects atleast one query and hence this dummy query has been provided.
Register mutation creats a user in the USER table based on the values that have been provided while calling this resolver.
The fields firstName, lastName, email and password are required to make a call to this resolver in order to create a user.
Password gets encrupted using bcryptjs hashing algorithm while other values are passes on as-is.

Queries and Mutations to be used during the registration process are defined here.

It returns an object of entity type User.
*/

import bcrypt from "bcryptjs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  // Define a default query to keep Graphql happy
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

    return user;
  }
}
