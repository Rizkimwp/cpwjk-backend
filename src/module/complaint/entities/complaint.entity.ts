import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('complaint')
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // DATA UTAMA
  // =========================

  @Column({
    type: 'varchar',
    length: 20,
  })
  tipe_laporan: 'pengaduan' | 'saran';

  @Column({
    type: 'varchar',
    length: 100,
  })
  kategori: string;

  @Column({
    type: 'text',
  })
  isi_laporan: string;

  // =========================
  // BUKTI PENDUKUNG
  // =========================

  @Column({
    type: 'json',
    nullable: true,
  })
  foto_video: string[] | null;

  @Column({
    type: 'json',
    nullable: true,
  })
  dokumen: string[] | null;

  // =========================
  // DATA PELAPOR
  // =========================

  @Column({
    type: 'varchar',
    length: 150,
  })
  nama_pelapor: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: true,
  })
  nik: string | null;

  @Column({
    type: 'varchar',
    length: 20,
  })
  no_whatsapp: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  anonymous: boolean;

  // =========================
  // STATUS
  // =========================

  @Column({
    type: 'varchar',
    length: 30,
    default: 'submitted',
  })
  status: string;

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
