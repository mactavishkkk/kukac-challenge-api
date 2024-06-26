import { Controller, Get, Post, Body, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/http-exception.filter';

@ApiTags('users')
@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiBody({ type: CreateUserDTO })
    create(@Body() userData: CreateUserDTO): Promise<User> {
        return this.userService.createUser(userData);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.userService.findUserById(Number(id));
    }

    @Put(':id')
    @ApiBody({ type: UpdateUserDTO })
    update(@Param('id') id: string, @Body() userData: UpdateUserDTO): Promise<User> {
        return this.userService.updateUser(Number(id), userData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<{ id: number; message: string }> {
        return this.userService.deleteUser(Number(id));
    }
}
