import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserInput } from 'src/modules/users/dto/update-user.input';

describe('UpdateUserInput', () => {
  it('should validate a valid partial input', async () => {
    const input = plainToInstance(UpdateUserInput, {
      id: '6855d8d466c8532f24ad16c8',
      name: 'test',
    });

    const errors = await validate(input);
    expect(errors.length).toBe(0);
  });

  it('should fail if the partial input is invalid', async () => {
    const input = plainToInstance(UpdateUserInput, {
      id: '6855d8d466c8532f24ad16c8',
      name: 'te',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail if the input contains immutable properties', async () => {
    const input = plainToInstance(UpdateUserInput, {
      name: 'test',
      username: 'testing',
      email: 'testing@example.com',
      role: 'ADMIN',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThanOrEqual(3);

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'username' }),
        expect.objectContaining({ property: 'email' }),
        expect.objectContaining({ property: 'role' }),
      ]),
    );
    errors.forEach((error) => {
      if (error.property === 'username') {
        expect(error.constraints).toEqual({
          immutable: 'The username cannot be modified',
        });
      }
      if (error.property === 'email') {
        expect(error.constraints).toEqual({
          immutable: 'The email cannot be modified',
        });
      }
      if (error.property === 'role') {
        expect(error.constraints).toEqual({
          immutable: 'The role cannot be modified',
        });
      }
    });
  });
});
