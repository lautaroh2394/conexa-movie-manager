import { Role } from '../roles.enum';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsRoleArray(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsRoleArray',
      target: object.constructor,
      propertyName: 'roles',
      constraints: [],
      options: validationOptions,
      validator: {
        validate(values: any[]) {
          const enumValues = Object.values(Role);
          return values.every(value => enumValues.includes(value));
        },
        defaultMessage() {
          return `Roles must be one of: ${Object.values(Role).join(', ')}`;
        }
      },
    });
  };
}