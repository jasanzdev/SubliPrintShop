import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from 'src/common/enums/roles';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  confirmPassword: string;

  @Field({ nullable: true })
  role?: Role;
}
