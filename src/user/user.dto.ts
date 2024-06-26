import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;

}

export class UpdateUserDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;
}

export class ResponseUserDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;
}

export class AuthUserDTO {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

}