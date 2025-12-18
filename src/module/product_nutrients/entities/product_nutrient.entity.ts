import { NutrientMaster } from 'src/module/nutrient_master/entities/nutrient_master.entity';
import { Product } from 'src/module/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_nutrients')
export class ProductNutrient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: true })
  minValue?: number;

  @Column({ type: 'float', nullable: true })
  maxValue?: number;

  @ManyToOne(() => NutrientMaster, (nutrient) => nutrient.productNutrients)
  @JoinColumn({ name: 'nutrient_id' })
  nutrient: NutrientMaster;

  @ManyToOne(() => Product, (product) => product.productNutrients)
  product: Product;

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
