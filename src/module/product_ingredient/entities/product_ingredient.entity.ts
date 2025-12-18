import { IngredientMaster } from 'src/module/ingredient_master/entities/ingredient_master.entity';
import { Product } from 'src/module/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_ingredients')
export class ProductIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (p) => p.productIngredients, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => IngredientMaster)
  ingredient: IngredientMaster;

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
