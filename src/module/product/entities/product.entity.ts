import { ProductIngredient } from 'src/module/product_ingredient/entities/product_ingredient.entity';
import { ProductNutrient } from 'src/module/product_nutrients/entities/product_nutrient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Contoh: “SATRIA MAS Pakan Ikan Mas Tenggelam SMW”

  @Column({ nullable: true })
  kategori: string; // Tenggelam / Terapung

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  productionCode: string; // 07016

  @Column({ nullable: true })
  npp: string; // KKP RI IM 057042018

  @Column({ type: 'integer', default: 0 })
  netWeightKg: number; // 50 KG

  @Column({ nullable: true })
  usage: string; // Cara penggunaan

  @Column({ nullable: true })
  storage: string; // Cara penyimpanan

  // Relasi ke nutrisi
  @OneToMany(() => ProductNutrient, (n) => n.product, { cascade: true })
  productNutrients: ProductNutrient[];

  @OneToMany(() => ProductIngredient, (i) => i.product, { cascade: true })
  productIngredients: ProductIngredient[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
