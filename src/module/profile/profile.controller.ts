import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/core/auth/roles.decorator';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { JwtAuthGuard } from 'src/core/auth/jwt.guard';

@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // profile.controller.ts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  async createOrUpdate(@Body() dto: CreateProfileDto) {
    const profile = await this.profileService.createOrUpdate(dto);
    return {
      success: true,
      message: 'Post berhasil',
      data: {
        profile,
      },
    };
  }

  @Get()
  async find() {
    return this.profileService.find();
  }
}
