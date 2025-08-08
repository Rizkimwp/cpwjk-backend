import { Injectable, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { Roles } from 'src/core/auth/roles.decorator';
import { JwtAuthGuard } from 'src/core/auth/jwt.guard';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async createOrUpdate(createProfileDto: CreateProfileDto): Promise<Profile> {
    const existingProfile = await this.profileRepository.findOne({ where: {} });

    if (existingProfile) {
      // update
      const updatedProfile = this.profileRepository.merge(
        existingProfile,
        createProfileDto,
      );
      return await this.profileRepository.save(updatedProfile);
    }

    // create
    const newProfile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(newProfile);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async find(): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      select: {
        mission: true,
        vision: true,
        slogan: true,
        name: true,
        profil: true,
      },
      where: {},
    });
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }
}
