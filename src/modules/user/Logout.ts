/* 
LogoutResolver wpuld log out a currently logged in user from the applicationm.

logout mutation would destroy the session and delete the cookie from the browser. Since the authentication is based on the session and cookie,
destroying those values would lead to an instant logout from the server side. GUI redirection would be done from the client based on the response 
from this mutation.

Queries and Mutations to be used during the login process are defined here.

It returns a boolean stating whether the user was successfullt logged out or not.
*/

import { Ctx, Mutation, Resolver } from "type-graphql";
import { UserContext } from "../../types/UserContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: UserContext): Promise<Boolean> {
    return new Promise((res, rej) => {
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.res.clearCookie("qid");
        return res(true);
      });
    });
  }
}
