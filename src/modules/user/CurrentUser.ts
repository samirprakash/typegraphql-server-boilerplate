/* 
CurrentUserResolver verifies whether a user can be authenticated at a given point fo time.

currentUser query checks the current active session to validate if the user is still logged in or not.

Queries and Mutations to be used during the login process are defined here.

It returns an object of entity type User or undefined based on whether the user can be authenticated or not.
*/

import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { UserContext } from "../../types/UserContext";

@Resolver()
export class CurrentUserResolver {
  @Query(() => User, { nullable: true })
  // currentUser user current context to get access to the session
  async currentUser(@Ctx() ctx: UserContext): Promise<User | undefined> {
    // if the current session does not contain a user ID, then return undefined
    if (!ctx.req.session!.userId) {
      return undefined;
    }

    // if session is active and the user can be authenticated using the existing user ID
    // look up USER table to get the user and return the user
    const user = await User.findOne({ where: { id: ctx.req.session!.userId } });
    return user;
  }
}
