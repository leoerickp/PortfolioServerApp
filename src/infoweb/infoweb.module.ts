import { Module } from '@nestjs/common';
import { InfowebService } from './infoweb.service';
import { InfowebController } from './infoweb.controller';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from '../profile/profile.module';
import { ExperiencesModule } from '../experiences/experiences.module';
import { PositionsModule } from '../positions/positions.module';
import { ProjectsModule } from '../projects/projects.module';
import { HardSkillsModule } from '../hard-skills/hard-skills.module';
import { AlbumsModule } from '../albums/albums.module';
import { PhotosModule } from '../photos/photos.module';

@Module({
  controllers: [InfowebController],
  providers: [InfowebService],
  imports: [
    ConfigModule,
    ProfileModule,
    ExperiencesModule,
    PositionsModule,
    ProjectsModule,
    HardSkillsModule,
    AlbumsModule,
    PhotosModule
  ]
})
export class InfowebModule { }
