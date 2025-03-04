import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto ';
import { Public } from './decorators/public.decorator';
import { AuthResponse, UserProfile } from './types';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiUnauthorizedResponseDoc } from './doc/api-unauthorized.decorator';
import { DocSignUp } from './doc/doc-sign-up-decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ){}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'User logged in succesfully', example: {
        "access_token": "some-long-token"
    }})
    @ApiUnauthorizedResponseDoc('Failed to validate credentials')
    async login(@Body() loginDto: LoginDto): Promise<AuthResponse>{
        const {username, password} = loginDto;
        return this.authService.login(username, password);
    }

    @Public()
    @Post('signup')
    @DocSignUp()
    async register(@Body() signUpDto: SignUpDto): Promise<UserProfile>{
        return this.authService.register(signUpDto)
    }

    @Get('profile')
    @ApiBearerAuth()
    @ApiUnauthorizedResponseDoc()
    @ApiOkResponse({ 
        description: 'Returns the users data minus the hashed password',
        example: {
            'id': 8,
            'username': 'someuser',
            'roles': [
                'regular_user'
            ]
        }
    })
    async getProfile(@Request() req): Promise<UserProfile>{
        return this.authService.getProfile(req.user.username)
    }
}
