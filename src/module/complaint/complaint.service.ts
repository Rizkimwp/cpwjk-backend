import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Complaint } from './entities/complaint.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintFilterDto } from './dto/filter-complaint.dto';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepo: Repository<Complaint>,
  ) {}

  // =========================================================
  // CREATE
  // =========================================================

  async create(dto: CreateComplaintDto): Promise<Complaint> {
    try {
      const complaint = this.complaintRepo.create({
        saran: dto.saran ?? null,
        kritik: dto.kritik ?? null,
        tipe_pelapor: dto.tipe_pelapor,
        nama_pelapor: dto.nama_pelapor,
      });

      return await this.complaintRepo.save(complaint);
    } catch (error) {
      throw new InternalServerErrorException('Gagal membuat saran dan kritik');
    }
  }

  // =========================================================
  // FIND ALL
  // =========================================================

  async findAll(
    query: ComplaintFilterDto,
  ): Promise<{ data: Complaint[]; total: number }> {
    try {
      const {
        sortBy = 'DESC',
        search,
        tipe_pelapor,
        page = 1,
        limit = 10,
      } = query;

      const qb = this.complaintRepo.createQueryBuilder('complaint').select();

      // =========================
      // SEARCH
      // =========================

      if (search) {
        qb.andWhere(
          `(
            LOWER(complaint.saran) LIKE :search
            OR LOWER(complaint.kritik) LIKE :search
            OR LOWER(complaint.nama_pelapor) LIKE :search
          )`,
          {
            search: `%${search.toLowerCase()}%`,
          },
        );
      }

      // =========================
      // FILTER TIPE PELAPOR
      // =========================

      if (tipe_pelapor) {
        qb.andWhere('complaint.tipe_pelapor = :tipe_pelapor', {
          tipe_pelapor,
        });
      }

      // =========================
      // SORT
      // =========================

      qb.orderBy('complaint.created_at', sortBy);

      // =========================
      // PAGINATION
      // =========================

      const [data, total] = await qb
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        data,
        total,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Gagal mengambil daftar saran dan kritik',
      );
    }
  }

  // =========================================================
  // FIND ONE
  // =========================================================

  async findOne(id: string): Promise<Complaint> {
    try {
      const complaint = await this.complaintRepo.findOne({
        where: { id },
      });

      if (!complaint) {
        throw new NotFoundException(
          `Saran/kritik dengan id ${id} tidak ditemukan`,
        );
      }

      return complaint;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Gagal mengambil data saran dan kritik',
      );
    }
  }

  // =========================================================
  // UPDATE
  // =========================================================

  async update(id: string, dto: CreateComplaintDto): Promise<Complaint> {
    try {
      const complaint = await this.findOne(id);

      this.complaintRepo.merge(complaint, {
        saran: dto.saran ?? null,
        kritik: dto.kritik ?? null,
        tipe_pelapor: dto.tipe_pelapor,
        nama_pelapor: dto.nama_pelapor,
      });

      return await this.complaintRepo.save(complaint);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Gagal mengubah data saran dan kritik',
      );
    }
  }

  // =========================================================
  // REMOVE
  // =========================================================

  async remove(id: string): Promise<void> {
    try {
      const complaint = await this.findOne(id);

      await this.complaintRepo.remove(complaint);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Gagal menghapus saran dan kritik',
      );
    }
  }
}
