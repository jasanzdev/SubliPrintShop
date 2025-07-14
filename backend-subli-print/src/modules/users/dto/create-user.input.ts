import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { IsValidRole } from 'src/common/decorators/valid-role.decorator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field()
  @IsString()
  @MinLength(3)
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(9)
  @MaxLength(12)
  phone?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character',
  })
  password: string;

  @Field()
  @IsString()
  @Match('password')
  confirmPassword: string;

  @Field({ nullable: true })
  @IsValidRole()
  role?: string;

  provider?: 'local' | 'google';
}
