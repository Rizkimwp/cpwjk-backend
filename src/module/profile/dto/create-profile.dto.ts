import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  profil: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slogan: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vision: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mission: string;
}
