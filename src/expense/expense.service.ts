import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Expense, Prisma } from '@prisma/client';
import { CreateExpenseDTO, UpdateExpenseDTO } from './expense.dto';

@Injectable()
export class ExpenseService {
    constructor(private prisma: PrismaService) { }

    async createExpense(data: CreateExpenseDTO): Promise<Expense> {
        return this.prisma.expense.create({
            data,
        });
    }

    async findAllExpenses(): Promise<(Expense & { user: any })[]> {
        return this.prisma.expense.findMany({
            include: { user: true },
        });
    }

    async findExpenseById(id: number): Promise<Expense | null> {
        const expense = await this.prisma.expense.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!expense) {
            throw new NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }

    async updateExpense(id: number, data: UpdateExpenseDTO): Promise<Expense> {
        try {
            const expense = await this.prisma.expense.findUnique({
                where: { id },
            });

            if (!expense) {
                throw new NotFoundException(`Expense with ID ${id} not found`);
            }

            return this.prisma.expense.update({
                where: { id },
                data,
            });

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Unique constraint failed on the ${error.meta.target}`);
                }
            }
            throw new InternalServerErrorException('Expense with ID not found or an unexpected error occurred');
        }
    }

    async deleteExpense(id: number): Promise<{ id: number; message: string }> {
        try {
            const expense = await this.prisma.expense.findUnique({
                where: { id },
            });

            if (!expense) {
                throw new NotFoundException(`Expense with ID ${id} not found`);
            }

            await this.prisma.expense.delete({ where: { id }, });

            return { id, message: 'Deleted successfully' };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`Unique constraint failed on the ${error.meta.target}`);
                }
            }
            throw new InternalServerErrorException('Expense with ID not found or an unexpected error occurred');
        }
    }
}
