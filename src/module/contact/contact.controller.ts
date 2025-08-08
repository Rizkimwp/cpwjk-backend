import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from 'src/core/auth/jwt.guard';
import { RolesGuard } from 'src/core/auth/roles.guard';
import { Roles } from 'src/core/auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Contact } from './entities/contact.entity';

@ApiBearerAuth()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post('create-or-update')
  async createOrUpdate(@Body() body: CreateContactDto) {
    return this.contactService.createOrUpdate(body);
  }

  @Get()
  async findAll(): Promise<Contact> {
    return await this.contactService.findAll();
  }
}
