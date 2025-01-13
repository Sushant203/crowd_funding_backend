import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    signOptions: { expiresIn: '6d' },
    secret: '123456'
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }