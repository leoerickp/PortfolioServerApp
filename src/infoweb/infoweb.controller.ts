import { Controller, Get } from '@nestjs/common';
import { DataResponse } from 'src/common/types/data-response';
import { InfowebService } from './infoweb.service';
import { Profile } from '../profile/entities/profile.entity';
import { Experience } from 'src/experiences/entities/experience.entity';
import { Project } from '../projects/entities/project.entity';
import { ValidSkillTypes } from 'src/hard-skills/enums/valid-skilltypes.enum';
import { HardSkill } from 'src/hard-skills/entities/hard-skill.entity';
import { Album } from 'src/albums/entities/album.entity';

@Controller('infoweb')
export class InfowebController {
  constructor(private readonly infowebService: InfowebService) { }

  @Get('profile')
  async getAllProfile(): Promise<DataResponse<Profile>> {
    return await this.infowebService.getAllProfile();
  }

  @Get('experiences')
  async getAllExperiences(): Promise<DataResponse<Experience>> {
    return await this.infowebService.getAllExperiences();
  }

  @Get('projects')
  async getAllProjects(): Promise<DataResponse<Project>> {
    return await this.infowebService.getAllProjects();
  }
  @Get('frontend')
  async getAllFrontend(): Promise<DataResponse<HardSkill>> {
    return await this.infowebService.getAllHardSkills(ValidSkillTypes.frontend);
  }
  @Get('backend')
  async getAllBackend(): Promise<DataResponse<HardSkill>> {
    return await this.infowebService.getAllHardSkills(ValidSkillTypes.backend);
  }
  @Get('dbengines')
  async getAllDataBasesEngine(): Promise<DataResponse<HardSkill>> {
    return await this.infowebService.getAllHardSkills(ValidSkillTypes.dbengines);
  }
  @Get('othertech')
  async getAllOtherTech(): Promise<DataResponse<HardSkill>> {
    return await this.infowebService.getAllHardSkills(ValidSkillTypes.otherTech);
  }
  @Get('albums')
  async getAllAlbums(): Promise<DataResponse<Album>> {
    return await this.infowebService.getAllAlbums();
  }
}
