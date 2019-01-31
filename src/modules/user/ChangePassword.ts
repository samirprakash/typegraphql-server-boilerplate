/* 
ChangePasswordResolver aids a user to update the current password for its account, in case the password has been forgotten.

changePassword mutation takes the redis token and new password specified by the user. If it is a valid token, then the user
password is updated with the new password.

Queries and Mutations to be used during the change password process are defined here.

It returns the updated user or else null.
*/

import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import redis from "../../config/redis";
import { FORGOT_PASSWORD_PREFIX } from "../../constants/prefix";
import { User } from "../../entity/User";
import { UserContext } from "../../types/UserContext";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  // changePassword reads redis token fron the forgot password email link and the new password to update the existing password for the user
  // It also uses the context to get the request in order to reset the session once the password has been updated
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: UserContext
  ): Promise<User | null> {
    // get user ID based on the redis token shared in the forgot password email link
    const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);

    // if the token expired or is it malformed, return null
    if (!userId) {
      return null;
    }

    // if the token is valid, look up USER table to find the
    // user associated with the user ID
    const user = await User.findOne({ where: { id: userId } });

    // if the user cannot be found out, return null
    if (!user) {
      return null;
    }

    // If the token is valid and the user is present in the database,
    // encrypt the new password and update user in the USER table
    user.password = await bcrypt.hash(password, 12);
    await user.save();

    // delete the token and value from redis store to avoid multiple calls
    await redis.del(FORGOT_PASSWORD_PREFIX + token);
    // reset the user ID in session
    ctx.req.session!.userId = userId;

    // return the user
    return user;
  }
}
