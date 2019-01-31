/* 
createEmailURL creates a well-formed URL pointing to our front end application.

The email being sent after the registration process fro user confirmation or the one being send after the forgot password 
would contain this link in the message body of the email. User clicks this link to proceed forward in the flow.

A new token is generated using the uuid package and the user ID is saved in redis store with key as the token and value as the ID. 
Expiration is set for 1 day. After this duration, token would expire and the link sent in the mail will not work as intended.
When the user clicks on the email link, there is a redirection to the front end application.

It returns a redirect URL to the client application with the generated token. Once the user clicks on the token,
based on the status of token, registration would be confirmed/rejected or the user can update password.
 */

import { v4 } from "uuid";
import redis from "../../config/redis";

const createEmailURL = async (userId: number, prefix: string, flow: string) => {
  const token = v4();
  await redis.set(prefix + token, userId, "ex", 60 * 60 * 24); // Expires after 1 day

  return `http://localhost:3000/user/${flow}/${token}`;
};

export default createEmailURL;
