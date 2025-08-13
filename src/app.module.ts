import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './core/auth/auth.module';
import { ProfileModule } from './module/profile/profile.module';
import { ArticleModule } from './module/article/article.module';
import { CarierModule } from './module/carier/carier.module';
import { ContactModule } from './module/contact/contact.module';
import { UserModule } from './core/users/users.module';
import { TagModule } from './module/tag/tag.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatbotModule } from './module/chatbot/chatbot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path folder publik
      serveRoot: '/uploads', // URL prefix // URL prefix untuk file statis
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'mysql'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // hati-hati di production
      }),
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
