import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SendEmailModule } from './send-email/send-email.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JoiValidationSchema } from './config/joi.validation';
import { EnvConfiguration } from './config/env.config';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperRolesModule } from './developer-roles/developer-roles.module';
import { HardSkillsModule } from './hard-skills/hard-skills.module';
import { ProjectsModule } from './projects/projects.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { PositionsModule } from './positions/positions.module';
import { AlbumsModule } from './albums/albums.module';
import { PhotosModule } from './photos/photos.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration], // check ./config/env.config.ts
      validationSchema: JoiValidationSchema // check ./config/joi.validation.ts
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['api'],
      renderPath: '/',
    }),

    MongooseModule.forRoot(process.env.MONGODB),

    UsersModule,
    AuthModule,
    CommonModule,
    SendEmailModule,
    DeveloperRolesModule,
    HardSkillsModule,
    ProjectsModule,
    ExperiencesModule,
    PositionsModule,
    AlbumsModule,
    PhotosModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
