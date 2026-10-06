import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateComplaintDto {
  // =========================
  // SARAN & KRITIK
  // =========================

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  saran?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  kritik?: string;

  // =========================
  // DATA PELAPOR
  // =========================

  @IsString()
  @IsNotEmpty()
  tipe_pelapor: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nama_pelapor: string;
}
