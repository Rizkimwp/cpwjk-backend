import { PartialType } from '@nestjs/swagger';
import { CreateCarierDto } from './create-carier.dto';

export class UpdateCarierDto extends PartialType(CreateCarierDto) {}
