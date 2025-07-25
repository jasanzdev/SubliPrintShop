import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string | symbol) {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [property] as [string],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints as [string];
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ];

          if (value === undefined || relatedValue === undefined) {
            return true;
          }

          return value === relatedValue;
        },

        defaultMessage(args: ValidationArguments): string {
          const [relatedPropertyName] = args.constraints as [string];
          return `The ${args.property} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}
