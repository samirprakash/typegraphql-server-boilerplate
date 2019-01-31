/* 
LoginResolver operates on the USER table to authenticate an existing user before logging in to the GUI.

login mutation takes email and password which are defined in the LoginInput. It also takes a context defined in UserContext to access request.
email and password are used to find the user in the USER table and if successfull, a cookie is set on the browser to keep the user logged in
even if the user closed the browser for enhanced UX.

Queries and Mutations to be used during the login process are defined here.

It returns an object of entity type User or null based on whether the user can be authenticated or not.
*/

import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { UserContext } from "../../types/UserContext";
import { LoginInput } from "./login/LoginInput";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  // login mutation tries to find a user from the DB
  // based on the provided email and password
  async login(
    @Arg("data")
    { email, password }: LoginInput,
    @Ctx() ctx: UserContext
  ): Promise<User | null> {
    // lookup for a user based on the email
    const user = await User.findOne({ where: { email } });

    // If user is not registered, return null
    if (!user) {
      return null;
    }

    // if the user exists, then comapre the incoming password
    // with the password from the database
    const valid = await bcrypt.compare(password, user.password);

    // If it is not a valid password for the user, return null
    if (!valid) {
      return null;
    }

    // If user can be found using the email and is the password is valid
    // set a session cookie with the unique user ID from database
    ctx.req.session!.userId = user.id;

    // return the user
    return user;
  }
}
