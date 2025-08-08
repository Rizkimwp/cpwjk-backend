import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserFilterDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createOrUpdate(createUserDto: CreateUserDto): Promise<any> {
    const { id, password, ...rest } = createUserDto;

    if (id) {
      // MODE UPDATE
      const existingUser = await this.userRepository.findOne({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException('User tidak ditemukan');
      }

      // Jangan ubah password jika tidak dikirim
      const updatedUser = await this.userRepository.save({
        ...existingUser,
        ...rest,
        ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
      });

      return plainToInstance(ResponseUserDto, {
        username: updatedUser.username,
        role: updatedUser.role,
        name: updatedUser.name,
      });
    } else {
      // MODE CREATE
      const hashedPassword = await bcrypt.hash(password!, 10);
      const newUser = this.userRepository.create({
        ...rest,
        password: hashedPassword,
      });
      const saved = await this.userRepository.save(newUser);
      return plainToInstance(ResponseUserDto, {
        username: saved.username,
        role: saved.role,
        name: saved.name,
      });
    }
  }

  async findByUsername(username: string): Promise<User> {
    const find = await this.userRepository.findOne({ where: { username } });
    if (!find) {
      throw new NotFoundException();
    }
    return plainToInstance(User, {
      id: find.id,
      username: find.username,
      role: find.role,
      password: find.password,
    });
  }

  async findAll(
    query: UserFilterDto,
  ): Promise<{ data: ResponseUserDto[]; total: number }> {
    try {
      const { role, search, page = 1, limit = 10 } = query;

      const qb = this.userRepository.createQueryBuilder('user').select();

      if (search) {
        qb.andWhere('(LOWER(user.name) LIKE :search)', {
          search: `%${search.toLowerCase()}%`,
        });
      }
      if (role) {
        qb.andWhere('user.role = :role', { role });
      }

      qb.orderBy('user.createdAt', 'DESC');

      const [data, total] = await qb
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dataWithoutPassword = data.map(({ password, ...rest }) => rest);

      return { data: dataWithoutPassword, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to load user list', error);
    }
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    await this.userRepository.remove(user);

    return { message: 'User berhasil dihapus' };
  }
}
