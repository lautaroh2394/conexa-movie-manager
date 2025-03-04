import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { createMock } from '@golevelup/ts-jest';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { Role } from '../auth/roles.enum';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>
  const mockedUser: User = {
    id: 1,
    username: 'my-username',
    hashedPassword: 'hashed-password',
    roles: []
  }

  beforeEach(async () => {
    usersRepository = createMock<Repository<User>>()
    service = new UsersService(usersRepository)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', ()=>{
    it('should return found user', async ()=>{
      const repositorySpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(mockedUser)
      const res = await service.findOne('my-username');
      expect(repositorySpy).toHaveBeenCalled()
      expect(res).toEqual(mockedUser)
    })

    it('should throw not found for non existant user', async ()=>{
      const repositorySpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null)
      const res = service.findOne('my-username');
      expect(repositorySpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(NotFoundException)
    })
  })

  describe('create', ()=>{
    it('should create and return user', async () =>{
      const repositorySpyCount = jest.spyOn(usersRepository, 'count').mockResolvedValue(0)
      const repositorySpyCreate = jest.spyOn(usersRepository, 'create').mockReturnValue(mockedUser)
      const repositorySpySave = jest.spyOn(usersRepository, 'save').mockResolvedValue(mockedUser)
      const {id, ...data} = mockedUser
      const res = await service.create(data as CreateUserDto);
      expect(repositorySpyCount).toHaveBeenCalled()
      expect(repositorySpyCreate).toHaveBeenCalled()
      expect(res).toEqual(mockedUser)
    })

    it('should throw bad request for taken username', async () =>{
      const repositorySpyCount = jest.spyOn(usersRepository, 'count').mockResolvedValue(1)
      const {id, ...data} = mockedUser
      const res = service.create(data as CreateUserDto);
      expect(repositorySpyCount).toHaveBeenCalled()
      expect(res).rejects.toThrow(BadRequestException)
    })
  })

  describe('getRolesFor', ()=>{
    it("should return user's roles", async ()=>{
      const repositorySpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue({...mockedUser, roles: [Role.ADMIN]})
      const res = await service.getRolesFor('my-username');
      expect(repositorySpy).toHaveBeenCalled()
      expect(res).toEqual([Role.ADMIN])
    })

    it("should throw not found for non existant user", async ()=>{
      const repositorySpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null)
      const res = service.getRolesFor('my-username');
      expect(repositorySpy).toHaveBeenCalled()
      expect(res).rejects.toThrow(NotFoundException)
    })
  })
});
