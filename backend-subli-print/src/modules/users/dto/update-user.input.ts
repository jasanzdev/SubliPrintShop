import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { Immutable } from 'src/common/decorators/immutable.decorator';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Immutable()
  username?: never;

  @Immutable()
  email?: never;

  @Immutable()
  password?: never;

  @Immutable()
  role?: never;
}
