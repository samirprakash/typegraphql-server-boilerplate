/* 
IsUserAuthenticated is a middleware to check if the current user is a valid user or not.

If a user is trying to access a secure area on the website to which it has not been assinged access to 
then this validator is going to return an error stating the fact.
*/

import { MiddlewareFn } from "type-graphql";
import { UserContext } from "../../types/UserContext";

export const IsUserAuthenticated: MiddlewareFn<UserContext> = async (
  { context },
  next
) => {
  if (!context.req.session!.userId) {
    throw new Error(
      "Unauthroized access requested. Please login or register to proceed."
    );
  }

  return next();
};
