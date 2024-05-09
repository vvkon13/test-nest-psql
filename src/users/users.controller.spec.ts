import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from '../models/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const usersServiceMock = {
      create: jest.fn(dto => Promise.resolve({ id: Date.now(), ...dto })),
      findAll: jest.fn().mockResolvedValue([new User(), new User()]),
      findOne: jest.fn().mockImplementation(id => Promise.resolve({ id, fullName: 'Test User', age: 30 })),
      update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
      remove: jest.fn().mockResolvedValue(Promise.resolve(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const newUser: CreateUserDto = {
        fullName: 'New User',
        age: 20
      };
      await expect(usersController.create(newUser)).resolves.toEqual({ id: expect.any(Number), ...newUser });
      expect(usersService.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await expect(usersController.findAll()).resolves.toHaveLength(2);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a single user', async () => {
      const id = 1;
      await expect(usersController.findOne(id.toString())).resolves.toEqual({
        id,
        fullName: 'Test User',
        age: 30,
      });
      expect(usersService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
      const id = 1;
      await expect(usersController.update(id.toString(), updateUserDto)).resolves.toEqual({
        id,
        ...updateUserDto,
      });
      expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const id = 1;
      await expect(usersController.remove(id.toString())).resolves.toBeUndefined();
      expect(usersService.remove).toHaveBeenCalledWith(id);
    });
  });
});
