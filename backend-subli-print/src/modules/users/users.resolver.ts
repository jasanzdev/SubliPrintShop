import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import ResetPasswordDto from './dto/reset-pass.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Mutation(() => User, { nullable: true })
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.usersService.update(input);
  }

  @Mutation(() => User)
  resetPassword(@Args('input') input: ResetPasswordDto) {
    return this.usersService.resetPassword(input);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
