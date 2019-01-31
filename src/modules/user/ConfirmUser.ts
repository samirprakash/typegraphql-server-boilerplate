/* 
ConfirmUserResolver updates user status as confirmed, if the user has clicked on the link sent in the confirmation mail after registration.

confirmUser mutation uses the token that was shared in the confirmation link to get the user ID from redis store. 
If found, it updates the confirmed status of the USER table to true.

As a first step, we check if the token that has ben provided is a valid redis token or not.
If it is a valid redis token i.e. token is well-formed and it has not expired, then redis would return back the userId that we had saved besides this token in the redis store.
We update the {confirmed} value to true, if we find a userId and return true. If we are not able to find a userId, we would return back false.

Queries and Mutations to be used during the user confirmation process are defined here.

It returns a boolean to verify if the confirmation process was successfull or not.
*/

import { Arg, Mutation, Resolver } from "type-graphql";
import redis from "../../config/redis";
import { USER_CONFIRMATION_PREFIX } from "../../constants/prefix";
import { User } from "../../entity/User";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  // confirmUser takes the token from confirmation email and returns a boolean
  async confirmUser(@Arg("token") token: string): Promise<Boolean> {
    // based on the token, get the user ID from redis store
    const userId = await redis.get(USER_CONFIRMATION_PREFIX + token);

    // if the token has expired or if the token in malformed, user ID cannot be retrieved
    // return false
    if (!userId) {
      return false;
    }

    // if user ID can be retrieved, then update the confirmed field for this user as true
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    // since we have used the token for its purpose, delete the token from redis store
    // to avoid multiple calls using the same confirmation link
    await redis.del(USER_CONFIRMATION_PREFIX + token);

    return true;
  }
}
