import { registerDecorator, ValidationOptions } from 'class-validator';

export function Immutable(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'immutable',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value): boolean {
          return value === 'undefined';
        },
        defaultMessage() {
          return `The ${propertyName} cannot be modified`;
        },
      },
    });
  };
}
