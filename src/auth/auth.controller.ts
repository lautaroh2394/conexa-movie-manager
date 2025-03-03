import { Body, Controller, Get, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto ';
import { Public } from './decorators/public.decorator';
import { AuthResponse, UserProfile } from './types';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ){}

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<AuthResponse>{
        const {username, password} = loginDto;
        return this.authService.login(username, password);
    }

    @Public()
    @Post('signup')
    async register(@Body() signUpDto: SignUpDto): Promise<UserProfile>{
        return this.authService.register(signUpDto)
    }

    @Get('profile')
    async getProfile(@Request() req): Promise<UserProfile>{
        return this.authService.getProfile(req.user.username)
    }
}
