import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateComplaintDto {
  @IsOptional()
  @IsString()
  id?: string;

  // =========================
  // DATA UTAMA
  // =========================

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  judul: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  kategori: string;

  @IsString()
  @IsNotEmpty()
  isi_laporan: string;

  // =========================
  // WAKTU KEJADIAN
  // =========================

  @IsDateString()
  tanggal_kejadian: string;

  // =========================
  // BUKTI PENDUKUNG
  // =========================
  @IsOptional()
  @IsArray()
  foto_video?: string[];

  @IsOptional()
  @IsArray()
  dokumen?: string[];

  // =========================
  // DATA PELAPOR
  // =========================

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nama_pelapor: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsString()
  @Length(16, 16)
  nik?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  no_whatsapp: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  @IsEmail()
  @MaxLength(150)
  email?: string | null;

  // =========================
  // ANONYMOUS
  // =========================
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  })
  @IsBoolean()
  anonymous?: boolean;
}
