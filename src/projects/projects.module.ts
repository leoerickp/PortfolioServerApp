import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './entities/project.entity';
import { DeveloperRolesService } from 'src/developer-roles/developer-roles.service';
import { HardSkillsService } from 'src/hard-skills/hard-skills.service';
import { DeveloperRolesModule } from 'src/developer-roles/developer-roles.module';
import { HardSkillsModule } from 'src/hard-skills/hard-skills.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, DeveloperRolesService, HardSkillsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema
      }
    ]),
    DeveloperRolesModule,
    HardSkillsModule,
  ],
  exports: [
    MongooseModule,
    ProjectsModule
  ]
})
export class ProjectsModule { }
