/* 
LoginResolver operates on the USER table to get the details of an existing user which can be authenticated.

Login mutation queries for a user in the USER table based on the values that have been provided while calling this resolver.
The fields email and password are required to make a call to this resolver in order to query a user.
It also takes a custom context which is defined in UserContext. It is required to get access to the request object.
As a first step, based on the email we verify if the user already exists in the db or not. If not, then we return null.
If the user exists, then we decrypt user password from DB and compare it with the one sent in the request. If match fails, we return null.
If both the checks pass, we set the session cookie with the auto-generated unique ID from the DB.
This cookie is then used in CurrentUserResolver to check if the user is already logged in or not. 

Queries and Mutations to be used during the login process are defined here.

It returns an object of entity type User.
*/

import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { UserContext } from "../../types/UserContext";
import { LoginInput } from "./login/LoginInput";

@Resolver()
export class LoginResolver {
  // Login mutation to create a new user in the USER DB
  // Validations and structure of the input is being read from LoginInput
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data")
    { email, password }: LoginInput,
    @Ctx() ctx: UserContext
  ): Promise<User | null> {
    // Check if the user ecists in the DB
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    // Check the provided password matches with the existing password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }

    // If both the checks pass, set the user ID from DB in session cookie
    ctx.req.session!.userId = user.id;

    return user;
  }
}
