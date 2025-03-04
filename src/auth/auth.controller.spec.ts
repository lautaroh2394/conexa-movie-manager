import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../../src/users/users.service';
import { createMock } from '@golevelup/ts-jest';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserProfile } from './types';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    authService = createMock<AuthService>();
    usersService = createMock<UsersService>();

    controller = new AuthController( 
      authService,
      usersService
    )
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', ()=>{
    it('should return access token', async ()=>{
      const mockedRes = {
        access_token: 'some-token'
      }
      const authServiceSpy = jest.spyOn(authService, 'login').mockResolvedValue(mockedRes)
      const res = await controller.login({username: 'my-username', password: 'my-password'})
      expect(authServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(mockedRes)
    })

    it('should throw unauthorized exception for invalid password', async ()=>{
      const authServiceSpy = jest.spyOn(authService, 'login').mockRejectedValue(new UnauthorizedException())
      const res = controller.login({username: 'my-username', password: 'invalid-password'})
      expect(authServiceSpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(UnauthorizedException)
    })
  })

  describe('register', () => {
    it('should return user profile', async ()=>{
      const mockedRes = {
        username: 'my-username',
        id: 1,
        roles: []
      } as UserProfile
      const authServiceSpy = jest.spyOn(authService, 'register').mockResolvedValue(mockedRes)
      const res = await controller.register({username: 'my-username', password: 'my-password', roles: []})
      expect(authServiceSpy).toHaveBeenCalled()
      expect(res).toEqual(mockedRes)
    })

    it('should throw bad request for duplicate username', ()=>{
      const authServiceSpy = jest.spyOn(authService, 'register').mockRejectedValue(new BadRequestException())
      const res = controller.register({username: 'duplicate-username', password: 'my-password', roles: []})
      expect(authServiceSpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(BadRequestException)
    })
  })
});
