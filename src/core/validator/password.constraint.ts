/**
 * Author: SyntaxErrorLineNULL.
 */

import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsPassword' })
export class PasswordConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'password is not valid';
  }

  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    console.log(value);
    return /^(?=.*\d)(?=.*[A-z])(?=.*[A-z])(?=.*[a-zA-Z]).{5,16}$/.test(value);
  }
}
