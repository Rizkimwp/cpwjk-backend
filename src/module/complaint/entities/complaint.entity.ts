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
    length: 255,
  })
  judul: string;

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
  // WAKTU KEJADIAN
  // =========================

  @Column({
    type: 'datetime',
  })
  tanggal_kejadian: Date;

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
    nullable: true,
  })
  no_whatsapp: string | null;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  email: string | null;

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
