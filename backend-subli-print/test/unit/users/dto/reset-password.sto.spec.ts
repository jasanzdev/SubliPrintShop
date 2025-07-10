import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ResetPasswordInput } from 'src/modules/users/dto/reset-pass.input';

describe('ResetPasswordInput', () => {
  it('should validate a valid input', async () => {
    const input = plainToInstance(ResetPasswordInput, {
      email: 'testing@gmail.com',
      password: 'Password123!',
      newPassword: 'Password@123',
      confirmPassword: 'Password@123',
    });

    const errors = await validate(input);
    expect(errors.length).toBe(0);
  });

  it('should fail if password too short', async () => {
    const input = plainToInstance(ResetPasswordInput, {
      email: 'testing@gmail.com',
      password: 'Passwd',
      newPassword: 'Password123',
      confirmPassword: 'Password123',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail if the password and newPassword are equal', async () => {
    const input = plainToInstance(ResetPasswordInput, {
      email: 'testing@gmail.com',
      password: 'Password123!',
      newPassword: 'Password123!',
      confirmPassword: 'Password123!',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('NotMatch');
  });

  it('should fail if newPassword too weak', async () => {
    const input = plainToInstance(ResetPasswordInput, {
      email: 'testing@gmail.com',
      password: 'Password123!',
      newPassword: 'Password123',
      confirmPassword: 'Password123',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(errors[0].constraints).toHaveProperty('matches');
  });

  it('should fail if the newPassword and confirmPassword are not equal', async () => {
    const input = plainToInstance(ResetPasswordInput, {
      email: 'testing@gmail.com',
      password: 'Password123!',
      newPassword: 'Password@123',
      confirmPassword: 'Password123!',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('Match');
  });
});
