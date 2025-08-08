import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRespository: Repository<Contact>,
  ) {}

  // contact-info.service.ts
  async createOrUpdate(data: CreateContactDto): Promise<Contact> {
    const existing = await this.contactRespository.findOne({
      where: { id: data.id },
    });

    if (existing) {
      const updated = this.contactRespository.merge(existing, data);
      return await this.contactRespository.save(updated);
    }

    const newContact = this.contactRespository.create(data);
    return await this.contactRespository.save(newContact);
  }

  async findAll(): Promise<Contact> {
    const profile = await this.contactRespository.findOne({
      where: {},
      select: ['id', 'address', 'phone', 'email', 'embedMap'],
    });
    if (!profile) {
      throw new Error('Contact information not found');
    }
    return profile;
  }
}
