/* 
ConfirmUserResolver operates on the USER table tp update the confirmation status of the user.

ConfirmUser mutation receives a token which is a redis id. This id contains the user ID of the newly registered user.
Based on the token, it tries to retreive the user id and if found updates the {confirmed} filed in user entity as true.
This means that the user has verified the account by clicking on the link send in the mail and is now a valid registered user.

As a first step, we check if the token that has ben provided is a valid redis token or not.
If it is a valid redis token i.e. token is well-formed and it has not expired, 
then redis would return back the userId that we had saved besides this token in the redis store.
We update the {confirmed} value to true, if we find a userId and return true.
If we are not able to find a userId, we would return back false.

Queries and Mutations to be used during the user confirmation process are defined here.
*/

import { Arg, Mutation, Resolver } from "type-graphql";
import redis from "../../config/redis";
import { USER_CONFIRMATION_PREFIX } from "../../constants/prefix";
import { User } from "../../entity/User";

@Resolver()
export class ConfirmUserResolver {
  // Login mutation to create a new user in the USER DB
  // Validations and structure of the input is being read from LoginInput
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(USER_CONFIRMATION_PREFIX + token);

    if (!userId) {
      return false;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(USER_CONFIRMATION_PREFIX + token);

    return true;
  }
}
