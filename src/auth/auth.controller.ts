import { Controller, Post, Body, UseFilters, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDTO, CreateUserDTO } from 'src/user/user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/exceptions/http-exception.filter';

@ApiTags('auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiBody({ type: AuthUserDTO })
    async login(@Body() authBody: AuthUserDTO) {
        const token = await this.authService.validateUser(authBody.email, authBody.password);
        if (!token) throw new HttpException('Invalid credentials', 401);

        return token;
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDTO) {
        return this.authService.register(createUserDto);
    }
}
