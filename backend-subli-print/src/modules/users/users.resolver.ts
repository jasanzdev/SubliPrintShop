import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserPlainObject } from 'src/common/interfaces/user.interface';
import { GqlJwtAuthGuard } from '../auth/guards/gql-jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ResetPasswordInput } from './dto/reset-pass.input';
import { User } from './entities/user.entity';

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
    if (!id || !isValidObjectId(id))
      throw new BadRequestException('Invalid Id');
    return this.usersService.findOne({ _id: id });
  }

  @Mutation(() => User, { nullable: true })
  updateUser(@Args('input') input: UpdateUserInput) {
    if (!input.id || !isValidObjectId(input.id))
      throw new BadRequestException('Invalid Id');
    return this.usersService.update(input);
  }

  @Mutation(() => User)
  resetPassword(@Args('input') input: ResetPasswordInput) {
    return this.usersService.resetPassword(input);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => String }) id: string) {
    if (!id || !isValidObjectId(id))
      throw new BadRequestException('Invalid Id');
    return this.usersService.remove(id);
  }

  @Query(() => User)
  @UseGuards(GqlJwtAuthGuard)
  getProfile(@GetUser() user: UserPlainObject) {
    return user;
  }
}
