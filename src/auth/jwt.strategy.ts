import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hk4NrX9hX0zUcOc3'
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findUserByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return { userId: payload.sub, email: payload.email };
    }
}
