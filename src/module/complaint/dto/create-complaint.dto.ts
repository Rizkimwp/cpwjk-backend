import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
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
  @IsIn(['pengaduan', 'saran'])
  tipe_laporan: 'pengaduan' | 'saran';

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  kategori: string;

  @IsString()
  @IsNotEmpty()
  isi_laporan: string;

  // =========================
  // BUKTI PENDUKUNG
  // =========================

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  foto_video?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
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

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  no_whatsapp: string;

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