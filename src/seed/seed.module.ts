import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../users/users.module';
import { HardSkillsModule } from '../hard-skills/hard-skills.module';
import { DeveloperRolesModule } from '../developer-roles/developer-roles.module';
import { ExperiencesModule } from '../experiences/experiences.module';
import { PositionsModule } from '../positions/positions.module';
import { ProjectsModule } from '../projects/projects.module';
import { AlbumsModule } from '../albums/albums.module';
import { PhotosModule } from '../photos/photos.module';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService, UsersService],
  imports: [
    ConfigModule,
    UsersModule,
    HardSkillsModule,
    DeveloperRolesModule,
    ExperiencesModule,
    PositionsModule,
    ProjectsModule,
    AlbumsModule,
    PhotosModule
  ]
})
export class SeedModule { }
