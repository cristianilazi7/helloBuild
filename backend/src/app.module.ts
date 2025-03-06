import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './core/controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ResponseService } from './common/response/response.service';
import { BcryptService } from './common/security/bcrypt.service';
import { JwtStrategy } from './core/app/auth/jwt.strategy';
import { GitHubController } from './core/controller/github.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h'),
        },
      }),
    }),
  ],
  controllers: [AppController, AuthController, GitHubController],
  providers: [AppService, BcryptService, JwtStrategy, ResponseService],
})
export class AppModule {}
