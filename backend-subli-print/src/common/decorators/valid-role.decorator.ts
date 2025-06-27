import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { Roles } from '../constants/roles.';

export function IsValidRole(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string | symbol) {
    registerDecorator({
      name: 'IsValidRole',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          return (
            !value ||
            (typeof value === 'string' &&
              (Object.values(Roles) as string[]).includes(value.toUpperCase()))
          );
        },

        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a valid Role`;
        },
      },
    });
  };
}
