import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma, Rent } from '@prisma/client';
import { CreateExpenseDTO, UpdateExpenseDTO } from 'src/expense/expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RentService {
    constructor(private prisma: PrismaService) { }

    async createRent(data: CreateExpenseDTO): Promise<Rent> {
        return this.prisma.rent.create({
            data,
        });
    }

    async findAllRents(): Promise<(Rent & { user: any })[]> {
        return this.prisma.rent.findMany({
            include: { user: true },
        });
    }

    async findRentById(id: number): Promise<Rent | null> {
        const expense = await this.prisma.rent.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!expense) {
            throw new NotFoundException(`Rent with ID ${id} not found`);
        }
        return expense;
    }

    async updateRent(id: number, data: UpdateExpenseDTO): Promise<Rent> {
        try {
            const expense = await this.prisma.rent.findUnique({
                where: { id },
            });

            if (!expense) {
                throw new NotFoundException(`Rent with ID ${id} not found`);
            }

            return this.prisma.rent.update({
                where: { id },
                data,
            });

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Unique constraint failed on the ${error.meta.target}`);
                }
            }
            throw new InternalServerErrorException('Rent with ID not found or an unexpected error occurred');
        }
    }

    async deleteRent(id: number): Promise<{ id: number; message: string }> {
        try {
            const expense = await this.prisma.rent.findUnique({
                where: { id },
            });

            if (!expense) {
                throw new NotFoundException(`Rent with ID ${id} not found`);
            }

            await this.prisma.rent.delete({ where: { id }, });

            return { id, message: 'Deleted successfully' };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Unique constraint failed on the ${error.meta.target}`);
                }
            }
            throw new InternalServerErrorException('Rent with ID not found or an unexpected error occurred');
        }
    }
}
