import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';

// 테스트시 'AuthService' 라는 이름으로 테스트 진행
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>; // 여기에 올려줘야 바깥에서도 접근 가능

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('AuthService(인증 서비스)의 객체를 정상적으로 만들어낼 수 있는지 확인한다', async () => {
    expect(service).toBeDefined();
  });

  it('비밀번호를 slat와 hash 형식으로 해싱 처리한 뒤, 새로운 사용자 계정을 만든다', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  
  it('이미 사용 중인 이메일로 회원가입을 시도하면 에러를 던진다', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a@a.com', password: 'hashed' } as User]);

    await expect(service.signup('a@a.com', 'mypassword')).rejects.toThrow(
      BadRequestException,
    );
  });
});
