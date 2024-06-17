import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/exceptions/http-exception.filter';
import { RentService } from './rent.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateExpenseDTO, UpdateExpenseDTO } from 'src/expense/expense.dto';
import { Rent } from '@prisma/client';

@ApiTags('rents')
@Controller('rents')
@UseFilters(HttpExceptionFilter)
export class RentController {
    constructor(private readonly rentService: RentService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: CreateExpenseDTO })
    create(@Body() expenseData: CreateExpenseDTO): Promise<Rent> {
        return this.rentService.createRent(expenseData);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<(Rent & { user: any })[]> {
        return this.rentService.findAllRents();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Rent | null> {
        return this.rentService.findRentById(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiBody({ type: UpdateExpenseDTO })
    update(@Param('id') id: string, @Body() expenseData: UpdateExpenseDTO): Promise<Rent> {
        return this.rentService.updateRent(Number(id), expenseData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<{ id: number; message: string }> {
        return this.rentService.deleteRent(Number(id));
    }
}
