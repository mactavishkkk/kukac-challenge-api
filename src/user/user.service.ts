import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);

            return this.prisma.user.create({
                data: {
                    ...data,
                    password: hashedPassword,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Unique constraint failed on the ${error.meta.target}`);
                }
            }
            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async findAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findUserById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async updateUser(id: number, data: UpdateUserDTO): Promise<User> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            return this.prisma.user.update({
                where: { id },
                data: {
                    name: data.name,
                    password: hashedPassword,
                },
            });

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Unique constraint failed on the ${error.meta.target}`);
                }
            }
            throw new InternalServerErrorException('User with ID not found or an unexpected error occurred');
        }
    }

    async deleteUser(id: number): Promise<{ id: number; message: string }> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            await this.prisma.user.delete({ where: { id }, });

            return { id, message: 'Deleted successfully' };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Unique constraint failed on the ${error.meta.target}`);
                }
            }
            throw new InternalServerErrorException('User with ID not found or an unexpected error occurred');
        }
    }
}
