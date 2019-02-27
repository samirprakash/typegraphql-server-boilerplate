/* 
ForgotPasswordResolver handles the forgot password flow which would aid a user by sending a mail with a link to change the user password.

forgotPassword mutation recieves an email which is used to get the registered user from the database.
If do not find the user linked to the email, then also we send true as we do not want to be specific with the error.
If we find the user, then we save the user ID in redis database with a new token and we send a change password mail to the user.

Queries and Mutations to be used during the user confirmation process are defined here.

It returns a boolean specifying if the email was sent or not
*/

import { Arg, Mutation, Resolver } from "type-graphql";
import { FORGOT_PASSWORD_PREFIX } from "../../constants/prefix";
import { User } from "../../entity/User";
import createEmailURL from "../../utils/email/create";
import { SendEmail } from "../../utils/email/send";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  // forgotPassword takes user email, looks up the user and
  // sends an email with the link to change password
  async forgotPassword(@Arg("email") email: string): Promise<Boolean> {
    // lookup for a registered user with the provided email
    const user = await User.findOne({ where: { email } });

    // if user is not registered, we still want to return true instead of false
    // This is being done to ensure that we do not inform the end user what is being done wrong
    // to avoid phishing attacks
    if (!user) {
      return true;
    }

    // if user exists, then send a change password email to the user's registered email
    await SendEmail(
      email,
      await createEmailURL(user.id, FORGOT_PASSWORD_PREFIX, "change-password"),
    );

    // if everything works, return true
    return true;
  }
}
