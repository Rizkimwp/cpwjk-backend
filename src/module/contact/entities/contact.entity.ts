import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string; // e.g., 'email', 'phone', 'address', etc.

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'text' })
  embedMap: string; // e.g., Google Maps embed link

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
