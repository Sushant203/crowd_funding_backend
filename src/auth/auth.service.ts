import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userServices: UserService,
        private readonly jwtService: JwtService
    ) { }

    // retaining the passwrod from the userServices to strip the passsword property inside signin method
    async signIn(email: string, password: string) {
        const user = await this.userServices.findByEmail(email);
        console.log(user)
        if (!user) {
            throw new UnauthorizedException(`invalid email`);
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException(`password not matched`)
        }

        const payload = { sub: user.user_id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
            msg: "login success"
        }
    }


}

