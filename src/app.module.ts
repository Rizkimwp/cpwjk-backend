import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './core/auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './module/profile/profile.module';
import { ArticleModule } from './module/article/article.module';
import { CarierModule } from './module/carier/carier.module';
import { ContactModule } from './module/contact/contact.module';
import { UserModule } from './core/users/users.module';
import { TagModule } from './module/tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatbotModule } from './module/chatbot/chatbot.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path folder publik
      serveRoot: '/uploads', // URL prefix // URL prefix untuk file statis
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // ganti sesuai konfigurasi MySQL kamu
      database: 'cpwjk',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // jangan pakai di production
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    ArticleModule,
    CarierModule,
    ContactModule,
    TagModule,
    ChatbotModule,
  ],
})
export class AppModule {}
