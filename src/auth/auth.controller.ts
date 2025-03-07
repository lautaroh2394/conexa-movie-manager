import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from '../../src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { Public } from './decorators/public.decorator';
import { AuthResponse, UserProfile } from './types';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiUnauthorizedResponseDoc } from './doc/api-unauthorized.decorator';
import { SignUpDocs } from './doc/sign-up-docs.decorator';
import { LoginDocs } from './doc/login-docs.decorator';
import { GetProfileDocs } from './doc/get-profile-docs.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ){}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @LoginDocs()
    async login(@Body() loginDto: LoginDto): Promise<AuthResponse>{
        const {username, password} = loginDto;
        return this.authService.login(username, password);
    }

    @Public()
    @Post('signup')
    @SignUpDocs()
    async register(@Body() signUpDto: SignUpDto): Promise<UserProfile>{
        return this.authService.register(signUpDto)
    }

    @Get('profile')
    @ApiBearerAuth()
    @GetProfileDocs()
    async getProfile(@Request() req): Promise<UserProfile>{
        return this.authService.getProfile(req.user.username)
    }
}
