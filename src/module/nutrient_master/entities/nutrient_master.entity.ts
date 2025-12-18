import { ProductNutrient } from 'src/module/product_nutrients/entities/product_nutrient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nutrient_master')
export class NutrientMaster {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => ProductNutrient,
    (productNutrient) => productNutrient.nutrient,
  )
  productNutrients: ProductNutrient[];

  @Column()
  name: string; // Protein Kasar, Lemak Kasar, dll.

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
