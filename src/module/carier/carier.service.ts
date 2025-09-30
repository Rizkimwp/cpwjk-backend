import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Carier } from './entities/carier.entity';
import { Repository } from 'typeorm';
import { User } from 'src/core/users/entities/user.entity';
import { CarierFilterDto, CreateCarierDto } from './dto/create-carier.dto';

import { ResponseCarierDto } from './dto/response-carier.dto';

@Injectable()
export class CarierService {
  constructor(
    @InjectRepository(Carier)
    private carierRepo: Repository<Carier>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createOrUpdate(dto: CreateCarierDto): Promise<Carier> {
    const { id, authorId, ...rest } = dto;

    if (id) {
      // MODE UPDATE
      const existingCarier = await this.carierRepo.findOne({
        where: { id },
        relations: ['author'],
      });

      if (!existingCarier) {
        throw new NotFoundException('Lowongan tidak ditemukan');
      }

      // Ambil author baru kalau diubah
      let author = existingCarier.author;
      if (authorId && authorId !== existingCarier.author.id) {
        const foundAuthor = await this.userRepo.findOne({
          where: { id: authorId },
        });
        if (!foundAuthor) {
          throw new NotFoundException('Author tidak ditemukan');
        }
        author = foundAuthor;
        if (!author) {
          throw new NotFoundException('Author tidak ditemukan');
        }
      }

      const updatedCarier = await this.carierRepo.save({
        ...existingCarier,
        ...rest,
        author,
      });

      return updatedCarier;
    } else {
      // MODE CREATE
      const author = await this.userRepo.findOne({ where: { id: authorId } });
      if (!author) {
        throw new NotFoundException('Author tidak ditemukan');
      }

      const newCarier = this.carierRepo.create({
        ...rest,
        author,
      });
      return await this.carierRepo.save(newCarier);
    }
  }

  async findAll(
    query: CarierFilterDto,
  ): Promise<{ data: ResponseCarierDto[]; total: number }> {
    try {
      const { sortBy, search, page = 1, limit = 10 } = query;

      const qb = this.carierRepo.createQueryBuilder('carier').select();

      if (search) {
        qb.andWhere('(LOWER(carier.position) LIKE :search)', {
          search: `%${search.toLowerCase()}%`,
        });
      }

      qb.orderBy('carier.createdAt', sortBy);

      const [data, total] = await qb
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      return { data: data, total };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load carier list',
        error,
      );
    }
  }

  async findAllPublished(
    query: CarierFilterDto,
  ): Promise<{ data: ResponseCarierDto[]; total: number }> {
    try {
      const { sortBy, search, page = 1, limit = 10 } = query;

      const qb = this.carierRepo.createQueryBuilder('carier').select();

      // hanya ambil yang dipublish
      qb.where('carier.isPublished = :isPublished', { isPublished: true });

      if (search) {
        qb.andWhere('LOWER(carier.position) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        });
      }

      qb.orderBy('carier.createdAt', sortBy);

      const [data, total] = await qb
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load carier list',
        error,
      );
    }
  }

  async findOne(id: string): Promise<Carier> {
    const carier = await this.carierRepo.findOne({ where: { id } });
    if (!carier) throw new NotFoundException(`Carier with id ${id} not found`);
    return carier;
  }

  async updatePublish(
    id: string,
    dto: { isPublished: boolean },
  ): Promise<Carier> {
    const carier = await this.carierRepo.findOne({ where: { id } });

    if (!carier) {
      throw new NotFoundException(`Carier dengan id ${id} tidak ditemukan`);
    }

    carier.isPublished = dto.isPublished; // lebih jelas daripada Object.assign

    return this.carierRepo.save(carier);
  }

  async remove(id: string): Promise<void> {
    const carier = await this.carierRepo.findOne({ where: { id } });

    if (!carier) {
      throw new NotFoundException(`Carier dengan id ${id} tidak ditemukan`);
    }

    await this.carierRepo.remove(carier);
  }
}
