import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { Complaint } from './entities/complaint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint])],
  controllers: [ComplaintController],
  providers: [ComplaintService],
})
export class ComplaintModule {}
