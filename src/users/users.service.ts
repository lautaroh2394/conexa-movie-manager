import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findOne(username: string) {
        const user = await this.usersRepository.findOne({
            where: { username }
        })
        if (!user) throw new NotFoundException()
        return user;
    }

    async create(userData){
        const usersWithSameUsername = await this.usersRepository.count({where: {username: userData.username}})
        if (usersWithSameUsername > 0 ) throw new BadRequestException("Username taken")
            
        const user = this.usersRepository.create(userData)
        await this.usersRepository.save(user)
        return;
    }

    async getRolesFor(username) {
        const user = await this.usersRepository.findOne({ where: {username}, select: ["roles"]});
        if (!user) throw new NotFoundException()
        return user?.roles
    }
}
