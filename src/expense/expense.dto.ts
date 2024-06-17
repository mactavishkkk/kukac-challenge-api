import { ApiProperty } from "@nestjs/swagger";

export class CreateExpenseDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    date: Date;

    @ApiProperty()
    value: number;

    @ApiProperty() // @ApiProperty({ name: 'user' })
    userId: number;
}

export class UpdateExpenseDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    date: Date;

    @ApiProperty()
    value: number;
}

export class ResponseExpenseDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    date: Date;

    @ApiProperty()
    value: number;
}