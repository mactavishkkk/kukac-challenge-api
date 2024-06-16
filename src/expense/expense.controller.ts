import { Controller, Get, Post, Body, Param, Put, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from '@prisma/client';
import { CreateExpenseDTO, UpdateExpenseDTO } from './expense.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/http-exception.filter';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('expenses')
@Controller('expenses')
@UseFilters(HttpExceptionFilter)
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: CreateExpenseDTO })
    create(@Body() expenseData: CreateExpenseDTO): Promise<Expense> {
        return this.expenseService.createExpense(expenseData);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<(Expense & { user: any })[]> {
        return this.expenseService.findAllExpenses();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Expense | null> {
        return this.expenseService.findExpenseById(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBody({ type: UpdateExpenseDTO })
    update(@Param('id') id: string, @Body() expenseData: UpdateExpenseDTO): Promise<Expense> {
        return this.expenseService.updateExpense(Number(id), expenseData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<{ id: number; message: string }> {
        return this.expenseService.deleteExpense(Number(id));
    }
}
