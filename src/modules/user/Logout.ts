/* 
LogoutResolver handles the logout flow.

logout mutation destroys current session. It also deletes the cookie from browser that was added during login for enhanced security. 
Since the authentication is based on the session and cookie, destroying those values would lead to an instant logout from the server side. 
GUI redirection would be done from the client based on the response from this mutation.

Queries and Mutations to be used during the logout process are defined here.

It returns a boolean stating whether the user was successfully logged out or not.
*/

import { Ctx, Mutation, Resolver } from "type-graphql";
import { UserContext } from "../../types/UserContext";

@Resolver()
export class LogoutResolver {
  // Read the context to get the request and response from server
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: UserContext): Promise<Boolean> {
    return new Promise((res, rej) => {
      // destroy current session
      ctx.req.session!.destroy(err => {
        // If session cannot be destroyed, return false
        if (err) {
          console.log(err);
          return rej(false);
        }
        // If session has been destroyed, clear cookie from browser and return true
        ctx.res.clearCookie("qid");
        return res(true);
      });
    });
  }
}
