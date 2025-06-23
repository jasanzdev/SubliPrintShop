import { validate } from 'class-validator';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

describe('LoginDTO', () => {
  let dto: LoginDto;

  beforeEach(() => {
    dto = new LoginDto();
  });

  it('should validate with correct values', async () => {
    dto.email = 'jasanz@gmail.com';
    dto.password = 'Jose@123';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate whit invalid email', async () => {
    dto.email = 'jasanz@gmail';
    dto.password = 'J4s4nz';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    errors.forEach((error) => {
      if (error.property === 'email') {
        expect(error.constraints?.isEmail).toBeDefined();
      } else {
        expect(true).toBeFalsy();
      }
    });
  });
});
