import { User } from 'src/core/users/entities/user.entity';
import { Tag } from 'src/module/tag/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;

  @Column({ type: 'int', default: 0 })
  views: number;
  // Many-to-many relationship for tags
  @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
