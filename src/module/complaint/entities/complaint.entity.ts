import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('complaint')
export class Complaint {
  // =========================
  // ID
  // =========================

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // SARAN & KRITIK
  // =========================

  @Column({
    type: 'text',
    nullable: true,
  })
  saran: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  kritik: string | null;

  // =========================
  // DATA PELAPOR
  // =========================

  @Column({
    type: 'varchar',
    length: 20,
  })
  tipe_pelapor: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  nama_pelapor: string;

  // =========================
  // TIMESTAMP
  // =========================

  @CreateDateColumn({
    type: 'datetime',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updated_at: Date;
}
