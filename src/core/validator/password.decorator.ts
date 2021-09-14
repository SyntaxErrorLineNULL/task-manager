/**
 * Author: SyntaxErrorLineNULL.
 */

import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsPassword(
  ValidationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'IsPassword',
      target: object.constructor,
      constraints: [],
      options: ValidationOptions,
      validator: {
        validate(
          value: string,
          args?: ValidationArguments,
        ): Promise<boolean> | boolean {
          return /^(?=.*\d)(?=.*[A-z])(?=.*[A-z])(?=.*[a-zA-Z]).{5,16}$/.test(
            value,
          );
        },
      },
    });
  };
}