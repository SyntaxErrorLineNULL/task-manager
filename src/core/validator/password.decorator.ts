/**
 * Author: SyntaxErrorLineNULL.
 */

import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';
import { PasswordConstraint } from './password.constraint';

export function IsPassword(ValidationOptions?: ValidationOptions): PropertyDecorator {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'IsPassword',
      target: object.constructor,
      constraints: [],
      options: ValidationOptions,
      validator: PasswordConstraint,
    });
  };
}
