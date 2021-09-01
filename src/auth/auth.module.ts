import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_TOKEN } from 'src/utils/constants';
import { localStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config:ConfigService)=>({
        secret: config.get<string>(JWT_TOKEN),
        signOptions: {expiresIn:'60m'}
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    localStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
