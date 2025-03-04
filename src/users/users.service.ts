import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/roles.enum';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { username }
        })
        if (!user) throw new NotFoundException()
        return user;
    }

    async create(userData: CreateUserDto): Promise<User>{
        const usersWithSameUsername = await this.usersRepository.count({where: {username: userData.username}})
        if (usersWithSameUsername > 0 ) throw new BadRequestException("Username taken")
        const user = this.usersRepository.create(userData)
        return this.usersRepository.save(user)
    }

    async getRolesFor(username): Promise<Role[]>{
        const user = await this.usersRepository.findOne({ where: {username}, select: ["roles"]});
        if (!user) throw new NotFoundException()
        return user.roles
    }
}
