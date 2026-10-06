import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { Type } from 'class-transformer';

export class ComplaintFilterDto {
  // =========================
  // SEARCH
  // =========================

  @IsOptional()
  @IsString()
  search?: string;

  // =========================
  // FILTER TIPE PELAPOR
  // =========================

  @IsOptional()
  @IsString()
  @IsIn(['internal', 'eksternal'])
  tipe_pelapor?: 'internal' | 'eksternal';

  // =========================
  // PAGINATION
  // =========================

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  // =========================
  // SORT
  // =========================

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortBy?: 'ASC' | 'DESC' = 'DESC';
}
