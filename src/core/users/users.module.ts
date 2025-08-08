import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/core/auth/auth.module';
import { AuthService } from 'src/core/auth/auth.service';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, AuthService], // ✅ Hapus JwtService
  exports: [UserService],
})
export class UserModule {}
