import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsUUID,
  IsArray,
} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isPublished: boolean;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Thumbnail image file',
  })
  @IsOptional()
  thumbnail?: any; // tipe `any` atau `Express.Multer.File` untuk file

  @ApiProperty()
  @IsUUID()
  authorId: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  tags?: string[];
}

export class ResponseArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  content: string;

  @ApiProperty()
  views: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Thumbnail image file',
  })
  thumbnail?: any; // tipe `any` atau `Express.Multer.File` untuk file

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  tags?: string[];

  @ApiProperty()
  createdAt: Date;
}

export class ArtikelFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'boolean') return value;
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return false; // default
  })
  isPublished?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}
