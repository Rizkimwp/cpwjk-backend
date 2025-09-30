import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCarierDto {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'Frontend Developer', description: 'Position title' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    example: 'Membuat UI website dengan React',
    description: 'Job description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Membuat UI website dengan React',
    description: 'Job description',
  })
  @IsString()
  contact: string;

  @ApiProperty({
    example: 'React, NestJS, TypeScript',
    description: 'Job requirements',
  })
  @IsString()
  @IsNotEmpty()
  requirements: string;

  @ApiProperty({
    example: '2025-12-31',
    description: 'Deadline for applications (YYYY-MM-DD)',
  })
  @IsDateString()
  deadline: Date;

  @ApiProperty()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isPublished: boolean;

  @ApiProperty({
    example: 'React, NestJS, TypeScript',
    description: 'Job requirements',
  })
  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}

export class CarierFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  sortBy: 'ASC' | 'DESC' = 'DESC';
}
