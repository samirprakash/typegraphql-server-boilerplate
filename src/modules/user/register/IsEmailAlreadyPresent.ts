/* 
IsEmailAlreadyPresent is a custom validator to check if the email being used for registration already 
exists in our database or not.

This class uses custom validation abilities provided by the class-validator package.
*/

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { User } from "../../../entity/User";

// Define a custom constraint
// check if the email in the request is already present in the DB
// If user with the email exists, then return false and constraint fails
// If not, then return true to pass the check
@ValidatorConstraint({ async: true })
export class IsEmailAlredyPresentConstraint
  implements ValidatorConstraintInterface {
  validate(email: string) {
    return User.findOne({ where: { email } }).then(user => {
      if (user) return false;
      return true;
    });
  }
}

// Use the custom constraint to create a custom validator
// This is used as a decorator on the email field in RegisterInput class
export function IsEmailAlreadyPresent(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlredyPresentConstraint
    });
  };
}
