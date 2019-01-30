import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../../modules/user/ConfirmUser";
import { CurrentUserResolver } from "../../modules/user/CurrentUser";
import { ForgotPasswordResolver } from "../../modules/user/ForgotPassword";
import { LoginResolver } from "../../modules/user/Login";
import { LogoutResolver } from "../../modules/user/Logout";
import { RegisterResolver } from "../../modules/user/Register";

const createSchema = () =>
  buildSchema({
    resolvers: [
      CurrentUserResolver,
      RegisterResolver,
      LoginResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      LogoutResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });

export default createSchema;
