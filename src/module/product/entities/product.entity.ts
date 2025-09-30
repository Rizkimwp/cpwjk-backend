import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  namaProduk: string;

  @Column({ length: 50, nullable: true })
  tipe: string; // Tenggelam / Apung

  @Column({ length: 50, nullable: true })
  kode: string; // SMW

  @Column('text', { nullable: true })
  caraPenggunaan: string;

  @Column('text', { nullable: true })
  caraPenyimpanan: string;

  @Column('int', { nullable: true })
  beratBersih: number;

  @Column({ length: 100, nullable: true })
  npp: string;

  @Column({ length: 50, nullable: true })
  kodeProduksi: string;

  // // Relasi
  // @OneToMany(() => BahanBaku, (bahanBaku) => bahanBaku.feed, { cascade: true })
  // bahanBaku: BahanBaku[];

  // @OneToMany(() => FeedImage, (image) => image.feed, { cascade: true })
  // images: FeedImage[];

  // @OneToMany(() => FeedAnalisa, (analisa) => analisa.feed, { cascade: true })
  // analisa: FeedAnalisa[];
}
