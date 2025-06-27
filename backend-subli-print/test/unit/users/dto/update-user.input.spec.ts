import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserInput } from 'src/modules/users/dto/update-user.input';

describe('UpdateUserInput', () => {
  it('should validate a valid partial input', async () => {
    const input = plainToInstance(UpdateUserInput, {
      name: 'Jose A',
    });

    const errors = await validate(input);
    expect(errors.length).toBe(0);
  });

  it('should fail if the partial input is invalid', async () => {
    const input = plainToInstance(UpdateUserInput, {
      name: 'Jo',
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });
});
