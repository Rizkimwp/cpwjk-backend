import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { Article } from './entities/article.entity';
import { User } from 'src/core/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Article, User])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
