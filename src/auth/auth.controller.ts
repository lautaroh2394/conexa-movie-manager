import { Body, Controller, Get, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/signup.dto ';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ){}

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const {username, password} = loginDto;
        return this.authService.login(username, password);
    }

    @Public()
    @Post('signup')
    async register(@Body() signUpDto: SignUpDto){
        return this.authService.register(signUpDto)
    }

    @Get('profile')
    async getProfile(@Request() req){
        const {hashedPassword, ...userData} = await this.usersService.findOne(req.user.username)
        return userData
    }
}
