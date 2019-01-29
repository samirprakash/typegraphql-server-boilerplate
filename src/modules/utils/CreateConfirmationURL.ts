/* 
createConfirmationURL creates a well-formed URL pointing to our front end application.
The confirmation email being sent after the registration process would contain this link in the message body.
User would be required to click on this link to conform their email address and complete the registration process.

A new token is generated using the uuid package and the user.ID for the registered user is saved in redis store
with key as the token and value as the ID. 

Expiration is set for 1 day. After this duration, token would expire and the link sent in the mail will not work as intended.

It returns a redirect URL to the client application with the generated token. Once the user clicks on the token,
based on the status of token, registration would be confirmed or rejected. This part is handled in ConfirmUserResolver class.

 */

import { v4 } from "uuid";
import redis from "../../config/redis";

const createConfirmationURL = async (userId: number) => {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 60 * 24); // Expires after 1 day

  return `http://localhost:3000/user/confirm/${token}`;
};

export default createConfirmationURL;
