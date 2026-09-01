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
  // CREATE / UPDATE
  // =========================================================

  async createOrUpdate(dto: CreateComplaintDto): Promise<Complaint> {
    try {
      const { id, ...rest } = dto;

      // =========================
      // UPDATE
      // =========================
      if (id) {
        const existingComplaint = await this.complaintRepo.findOne({
          where: { id },
        });

        if (!existingComplaint) {
          throw new NotFoundException(
            `Pengaduan dengan id ${id} tidak ditemukan`,
          );
        }

        const updatedComplaint = this.complaintRepo.merge(existingComplaint, {
          ...rest,

          foto_video: rest.foto_video ?? existingComplaint.foto_video,

          dokumen: rest.dokumen ?? existingComplaint.dokumen,
        });

        return await this.complaintRepo.save(updatedComplaint);
      }

      // =========================
      // CREATE
      // =========================
      const newComplaint = this.complaintRepo.create({
        ...rest,

        foto_video: rest.foto_video ?? [],

        dokumen: rest.dokumen ?? [],

        status: 'submitted',
      });

      return await this.complaintRepo.save(newComplaint);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to create or update complaint',
        error,
      );
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
        tipe_laporan,
        search,
        kategori,
        status,
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
            LOWER(complaint.judul) LIKE :search
            OR LOWER(complaint.isi_laporan) LIKE :search
            OR LOWER(complaint.nama_pelapor) LIKE :search
          )`,
          {
            search: `%${search.toLowerCase()}%`,
          },
        );
      }

      // =========================
      // FILTER KATEGORI
      // =========================

      if (kategori) {
        qb.andWhere('complaint.kategori = :kategori', {
          kategori,
        });
      }

      // =========================
      // FILTER STATUS
      // =========================

      if (status) {
        qb.andWhere('complaint.status = :status', {
          status,
        });
      }

      if (tipe_laporan) {
        qb.andWhere('complaint.tipe_laporan = :tipe_laporan', {
          tipe_laporan,
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
        'Failed to load complaint list',
        error,
      );
    }
  }

  // =========================================================
  // FIND ONE
  // =========================================================

  async findOne(id: string): Promise<Complaint> {
    const complaint = await this.complaintRepo.findOne({
      where: { id },
    });

    if (!complaint) {
      throw new NotFoundException(`Complaint dengan id ${id} tidak ditemukan`);
    }

    return complaint;
  }

  // =========================================================
  // UPDATE STATUS
  // =========================================================

  async updateStatus(id: string, dto: { status: string }): Promise<Complaint> {
    const complaint = await this.complaintRepo.findOne({
      where: { id },
    });

    if (!complaint) {
      throw new NotFoundException(`Complaint dengan id ${id} tidak ditemukan`);
    }

    complaint.status = dto.status;

    return await this.complaintRepo.save(complaint);
  }

  // =========================================================
  // REMOVE
  // =========================================================

  async remove(id: string): Promise<void> {
    const complaint = await this.complaintRepo.findOne({
      where: { id },
    });

    if (!complaint) {
      throw new NotFoundException(`Complaint dengan id ${id} tidak ditemukan`);
    }

    await this.complaintRepo.remove(complaint);
  }
}
