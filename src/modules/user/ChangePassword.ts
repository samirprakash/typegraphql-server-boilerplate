/* 
ChangePasswordResolver handles the change password flow which would aid a user to update the current password for its account.

changePassword mutation recieves a token and a password. It uses the token to get the user ID that is saved in the redis store.
If the token is valid and if the token has not expired, then a user ID is returned from redis store.
We update the user's password with the new password that has been selected by the user.

Queries and Mutations to be used during the user confirmation process are defined here.
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
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: UserContext
  ): Promise<User | null> {
    // get the useri ID from redis using the token from forgot password email
    const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);

    if (!userId) {
      return null;
    }

    // find the user in database based on the retrieved user ID
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    // delete the token from redis
    await redis.del(FORGOT_PASSWORD_PREFIX + token);

    // encrupt and update user password
    user.password = await bcrypt.hash(password, 12);
    await user.save();

    ctx.req.session!.userId = userId;

    return user;
  }
}
