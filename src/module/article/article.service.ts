import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ArtikelFilterDto,
  CreateArticleDto,
  ResponseArticleDto,
} from './dto/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { User } from 'src/core/users/entities/user.entity';
import { Tag } from '../tag/entities/tag.entity';
import * as fs from 'fs';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
  ) {}

  async create(dto: CreateArticleDto): Promise<Article> {
    const author = await this.userRepo.findOne({ where: { id: dto.authorId } });
    if (!author) throw new NotFoundException('Author not found');

    const tags = dto.tags?.length
      ? await this.tagRepo.find({ where: { id: In(dto.tags) } })
      : [];

    const article = this.articleRepo.create({ ...dto, author, tags });
    return await this.articleRepo.save(article);
  }

  async findAll(
    query: ArtikelFilterDto,
  ): Promise<{ data: ResponseArticleDto[]; total: number }> {
    try {
      const { isPublished, search, page = 1, limit = 10 } = query;

      const qb = this.articleRepo
        .createQueryBuilder('artikel')
        .leftJoinAndSelect('artikel.author', 'author'); // kalau mau ambil data author juga

      if (search) {
        qb.andWhere('(LOWER(artikel.title) LIKE :search)', {
          search: `%${search.toLowerCase()}%`,
        });
      }
      if (isPublished !== undefined) {
        qb.andWhere('artikel.isPublished = :isPublished', { isPublished });
      }

      qb.orderBy('artikel.createdAt', 'DESC');

      const [articles, total] = await qb
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      // Mapping ke DTO
      const data: ResponseArticleDto[] = articles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        isPublished: article.isPublished,
        content: article.content,
        authorId: article.author.name, // pastikan field ini ada di entity Article
        thumbnail: article.thumbnail,
        createdAt: article.createdAt,
        views: article.views,
      }));

      return { data, total };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load article list',
        error,
      );
    }
  }

  async findPopular(): Promise<ResponseArticleDto[]> {
    try {
      const articles = await this.articleRepo.find({
        where: { isPublished: true },
        order: { views: 'DESC' },
        take: 4, // ambil 5 artikel terpopuler
      });
      const data: ResponseArticleDto[] = articles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        isPublished: article.isPublished,
        content: article.content,
        authorId: article.author.name, // pastikan field ini ada di entity Article
        thumbnail: article.thumbnail,
        createdAt: article.createdAt,
        views: article.views,
      }));

      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load popular articles',
        error,
      );
    }
  }

  async findOne(slug: string): Promise<ResponseArticleDto> {
    const article = await this.articleRepo.findOne({
      where: { slug },
      relations: ['tags', 'author'],
    });
    if (!article) throw new NotFoundException('Article not found');

    const data: ResponseArticleDto = {
      id: article.id,
      title: article.title,
      slug: article.slug,
      isPublished: article.isPublished,
      content: article.content,
      authorId: article.author.name || 'Penulis tidak diketahui',
      thumbnail: article.thumbnail,
      createdAt: article.createdAt,
      views: article.views,
      tags: article.tags.map((tag) => tag.name), // pastikan field name ada di entity Tag
    };

    return data;
  }

  async remove(id: string): Promise<{ message: string }> {
    const article = await this.articleRepo.findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Hapus thumbnail kalau ada
    if (article.thumbnail) {
      const oldPath = `./uploads/articles/thumbnail/${article.thumbnail}`;
      try {
        await fs.promises.unlink(oldPath);
      } catch (err) {
        console.warn(`Gagal hapus file thumbnail: ${err.message}`);
      }
    }

    await this.articleRepo.remove(article);

    return { message: 'Article deleted successfully' };
  }

  async update(id: string, dto: CreateArticleDto): Promise<Article> {
    const article = await this.articleRepo.findOne({
      where: { id },
      relations: ['tags', 'author'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Hapus thumbnail lama jika ada file baru
    if (dto.thumbnail && dto.thumbnail !== article.thumbnail) {
      if (article.thumbnail) {
        const oldPath = `./uploads/articles/thumbnail/${article.thumbnail}`;
        try {
          await fs.promises.unlink(oldPath);
        } catch (err) {
          console.warn(`Gagal hapus file lama: ${err.message}`);
        }
      }
      article.thumbnail = dto.thumbnail;
    }

    // Jika ganti author
    if (dto.authorId) {
      const author = await this.userRepo.findOne({
        where: { id: dto.authorId },
      });
      if (!author) throw new NotFoundException('Author not found');
      article.author = author;
    }

    // Jika ganti tags
    if (dto.tags && dto.tags.length > 0) {
      const tags = await this.tagRepo.find({ where: { id: In(dto.tags) } });
      article.tags = tags;
    }

    // Update field lain yang diubah
    if (dto.title !== undefined) article.title = dto.title;
    if (dto.content !== undefined) article.content = dto.content;
    if (dto.isPublished !== undefined) article.isPublished = dto.isPublished;

    return await this.articleRepo.save(article);
  }
}
