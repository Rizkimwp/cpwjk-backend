import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule, // ⬅️ WAJIB agar ConfigService tersedia di context module ini
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // context untuk registerAsync
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        console.log('SECRET DI JWT MODULE:', secret);
        return {
          secret,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
