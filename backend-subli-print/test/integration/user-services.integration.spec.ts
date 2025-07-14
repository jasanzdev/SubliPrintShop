import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/modules/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/schemas/user.schema';
import { Model } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';

describe('UsersService (integration)', () => {
  let service: UsersService;
  let userModel: Model<User>;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('should create a user and find it', async () => {
    await userModel.create({
      name: 'Jose',
      username: 'jose',
      email: 'jose@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    const found = await service.findOne({ email: 'jose@example.com' });
    expect(found).toBeDefined();
    if (found) {
      expect(found.email).toBe('jose@example.com');
    }
  });

  it('should create a user and returned with local provider', async () => {
    const data: CreateUserInput = {
      name: 'Jose',
      username: 'jose',
      email: 'jose@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      provider: 'local',
    };

    const user = await service.create(data);
    expect(user).toBeDefined();
    if (user) {
      expect(user.email).toBe('jose@example.com');
    }
  });

  it('should create a users and find all users', async () => {
    await userModel.create(
      {
        name: 'Jose',
        username: 'jose',
        email: 'jose@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        provider: 'local',
      },
      {
        name: 'Jose 2',
        username: 'jose_2',
        email: 'jose_2@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        provider: 'local',
      },
    );

    const result = await service.findAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThanOrEqual(2);
  });
});
