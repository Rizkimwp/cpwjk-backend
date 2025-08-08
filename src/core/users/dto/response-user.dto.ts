import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';
import { Expose } from 'class-transformer';

export class ResponseUserDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  role: Role;
}
