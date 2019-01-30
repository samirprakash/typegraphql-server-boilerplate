/* 
ForgotPasswordResolver handles the change password flow which would aid a user to update the current password for its account.

forgotPassword mutation recieves an email which is used to get the registered user from the database.
If do not find the user linked to the email, then also we send true as we do not want to be specific with the error.
If we find the user, then we save the user ID in redis database with a new token and we send a change password mail to the user.

Since we have two tokens being saved now, one for the forgot password and one for user confirmation, 
we should  be adding a prefix to the token to differentiate them when there is a need to retrieve
the tokens and the corresponding values. This is being passed along with the current flow to the SendEmail method.

Queries and Mutations to be used during the user confirmation process are defined here.
*/

import { Arg, Mutation, Resolver } from "type-graphql";
import { FORGOT_PASSWORD_PREFIX } from "../../constants/prefix";
import { User } from "../../entity/User";
import createEmailURL from "../utils/createEmailURL";
import { SendEmail } from "../utils/SendEmail";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    // email to send the mail to
    // prefix to differentiate what kind of token has been used
    // 'change-password' is the current flow which would be added to the mail
    SendEmail(
      email,
      await createEmailURL(user.id, FORGOT_PASSWORD_PREFIX, "change-password")
    );

    return true;
  }
}
