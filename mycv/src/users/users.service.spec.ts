import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let fakeUsersRepository: Partial<Record<keyof any, jest.Mock>>;

  beforeEach(async () => {
    // 가짜 유저 레포지토리 생성
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      password: 'password'
    };
    
    fakeUsersRepository = {
      create: jest.fn().mockImplementation(user => {
        return { id: Math.floor(Math.random() * 999), ...user };
      }),
      save: jest.fn().mockImplementation(user => {
        return Promise.resolve(user);
      }),
      findOne: jest.fn().mockImplementation(query => {
        if (query?.where?.id) {
          return Promise.resolve({ ...mockUser, id: query.where.id });
        }
        return Promise.resolve(null);
      }),
      find: jest.fn().mockImplementation(query => {
        return Promise.resolve([{ ...mockUser, email: query?.where?.email }]);
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: fakeUsersRepository
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
