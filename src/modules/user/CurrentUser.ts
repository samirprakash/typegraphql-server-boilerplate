/* 
CurrentUserResolver operates on the USER table to get the details of an existing user which can be authenticated.

Query defined below returns a user if its session cookie is already valid. 
If a user has done a successful login in history and comes back to the website, then instead of asking for a username and password, 
this cookie would be read and authenticated to validate that it is a returning user. 
If authenticated, user shall be redirected the user directly to the landing page without going through the login process again.
If not authenticated, user should be redirected to the login page.

Queries and Mutations to be used during the login process are defined here.

It returns an object of entity type User.
*/

import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { UserContext } from "../../types/UserContext";

@Resolver()
export class CurrentUserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: UserContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }
    const user = User.findOne({ where: { id: ctx.req.session!.userId } });

    return user;
  }
}
