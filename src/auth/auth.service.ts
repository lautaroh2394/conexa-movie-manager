import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto ';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(username: string, password: string){
        const user = await this.usersService.findOne(username);
        const samePassword = await bcrypt.compare(password, user.hashedPassword);
        if (!samePassword) throw new UnauthorizedException()

        const payload = { sub: user.id, username: user.username}
        return { access_token: await this.jwtService.signAsync(payload) };
    }

    async register({username, password, roles}: SignUpDto) {
        const hashedPassword = bcrypt.hashSync(password, 1);
        return this.usersService.create({username, hashedPassword, roles})
    }
}
