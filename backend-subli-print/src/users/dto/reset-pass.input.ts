import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { NotMatch } from 'src/common/decorators/no-match.decorator';

@InputType()
export default class ResetPasswordDto {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @MinLength(8)
  @NotMatch('password', {
    message: 'The passwords must be different.',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character',
  })
  newPassword: string;

  @Field()
  @IsString()
  @MinLength(6)
  @Match('newPassword', { message: 'Passwords do not match' })
  confirmPassword: string;
}
