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
