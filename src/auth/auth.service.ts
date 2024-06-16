import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);

        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return this.jwtService.sign(result);
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: any) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await this.userService.createUser({
            ...user,
            password: hashedPassword,
        });
        const { password, ...result } = newUser;
        return result;
    }
}
