import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';

describe('CreateUserInput', () => {
  it('should validate a valid input without role', async () => {
    const input = plainToInstance(CreateUserInput, {
      name: 'Jose A',
      username: 'jasanz',
      email: 'jasanz.example@gmail.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    const errors = await validate(input);
    expect(errors.length).toBe(0);
  });

  it('should fail if name too short', async () => {
    const input = plainToInstance(CreateUserInput, {
      name: 'Jo',
      username: 'jasanz',
      email: 'jasanz.example@gmail.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail if username too short', async () => {
    const input = plainToInstance(CreateUserInput, {
      name: 'Jose A',
      username: 'ja',
      email: 'jasanz.example@gmail.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail if email is invalid', async () => {
    const input = plainToInstance(CreateUserInput, {
      name: 'Jose A',
      username: 'jasanz',
      email: 'jasanz.example@gmail',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail if password too weak', async () => {
    const input = plainToInstance(CreateUserInput, {
      name: 'Jose A',
      username: 'jasanz',
      email: 'jasanz.example@gmail.com',
      password: 'Password123',
      confirmPassword: 'Password123',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail if passwords do not matches', async () => {
    const input = plainToInstance(CreateUserInput, {
      name: 'Jose A',
      username: 'jasanz',
      email: 'jasanz.example@gmail.com',
      password: 'Password123!',
      confirmPassword: 'Password123',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('Match');
  });

  it('should fail if role is present and is invalid', async () => {
    const input = plainToInstance(CreateUserInput, {
      name: 'Jose A',
      username: 'jasanz',
      email: 'jasanz.example@gmail.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      role: 'invalid',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('IsValidRole');
  });
});
