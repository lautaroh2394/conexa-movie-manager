import { AuthService } from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  const mockedUser = {
    username: 'my-username', 
    hashedPassword: '$2b$04$hg3Aqk9fOnVh4QuuubTuLeNNjTcxVPQe7KZhNFXeNpXBXPPDBFTCy', 
    roles: [], 
    id: 1
  };

  beforeEach(async () => {
    usersService = createMock<UsersService>();
    jwtService = createMock<JwtService>();
    service = new AuthService(usersService, jwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login and return access token', async ()=>{  
      const jwtServiceSpy = jest.spyOn(jwtService, 'signAsync').mockResolvedValue("access-token")
      const usersServiceSpy = jest.spyOn(usersService, 'findOne').mockResolvedValue(mockedUser)
      const res = await service.login('my-username', '1234');
      expect(usersServiceSpy).toHaveBeenCalled()
      expect(jwtServiceSpy).toHaveBeenCalled()
      expect(res).toEqual({'access_token': 'access-token'})
    })

    it('should throw unauthorized exception for invalid password', async ()=>{
      const usersServiceSpy = jest.spyOn(usersService, 'findOne').mockResolvedValue(mockedUser)
      const res = service.login('my-username', 'invalid-password');
      expect(usersServiceSpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('register', () => {
    it('should create user and return user profile', async ()=>{
      const usersServiceSpyCreate = jest.spyOn(usersService, 'create').mockResolvedValue(mockedUser)
      const usersServiceSpyGetProfile = jest.spyOn(usersService, 'findOne').mockResolvedValue({id: 1, username: 'my-username', hashedPassword: 'hashed-password', roles: []})
      const res = await service.register({username: 'my-username', password: 'my-password', roles: []})
      expect(usersServiceSpyCreate).toHaveBeenCalled()
      expect(usersServiceSpyGetProfile).toHaveBeenCalled()
      expect(res).toEqual({username: 'my-username', id: 1, roles: []})
    })

    it('should throw bad request for duplicate user', async ()=>{
      const usersServiceSpyCreate = jest.spyOn(usersService, 'create').mockRejectedValue(new BadRequestException())
      const res = service.register({username: 'duplicate-username', password: 'my-password', roles: []})
      expect(usersServiceSpyCreate).toHaveBeenCalled()
      expect(res).rejects.toThrow(BadRequestException)
    })
  })

  describe('getProfile', ()=>{
    it('should return user profile', async ()=>{
      const usersServiceSpy = jest.spyOn(usersService, 'findOne').mockResolvedValue(mockedUser)
      const res = await service.getProfile('my-username')
      expect(usersServiceSpy).toHaveBeenCalled()
      const {hashedPassword, ...data} = mockedUser;
      expect(res).toEqual(data)
    })
  })
});
