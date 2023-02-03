import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataResponse } from '../common/types/data-response';
import { Profile } from '../profile/entities/profile.entity';
import { Experience } from '../experiences/entities/experience.entity';
import { Position } from '../positions/entities/position.entity';
import { Project } from '../projects/entities/project.entity';
import { HardSkill } from '../hard-skills/entities/hard-skill.entity';
import { ValidSkillTypes } from 'src/hard-skills/enums/valid-skilltypes.enum';
import { Album } from '../albums/entities/album.entity';
import { Photo } from '../photos/entities/photo.entity';

@Injectable()
export class InfowebService {
    constructor(
        @InjectModel(Profile.name)
        private readonly profileModel: Model<Profile>,
        @InjectModel(Experience.name)
        private readonly experiencesModel: Model<Experience>,
        @InjectModel(Position.name)
        private readonly positionsModel: Model<Position>,
        @InjectModel(Project.name)
        private readonly projectsModel: Model<Project>,
        @InjectModel(HardSkill.name)
        private readonly hardskillsModel: Model<HardSkill>,
        @InjectModel(Album.name)
        private readonly albumsModel: Model<Album>,
        @InjectModel(Photo.name)
        private readonly photosModel: Model<Photo>
    ) { }
    async getAllProfile(): Promise<DataResponse<Profile>> {
        const profile: Profile[] = await this.profileModel.find();
        const count: number = await this.profileModel.find().count();
        return { count, data: profile }
    }
    async getAllExperiences(): Promise<DataResponse<Experience>> {
        const experiences = await this.experiencesModel.find({ isVisible: true })
            .select('_id company companyName updatedDate');
        let completeExperiences = [];
        for (const experience of experiences) {
            const { _id, company, companyName, updatedDate, } = experience;
            const countPosition = await this.positionsModel.find({ experienceId: experience, isVisible: true }).count();
            const positions = await this.positionsModel.find({ experienceId: experience, isVisible: true })
                .populate({
                    path: 'hardSkillsId',
                    select: '_id technology selfRate amountPrjs imgUrl skillType updatedDate'
                })
                .select('_id positionName date achievements hardSkillsId updatedDate');
            completeExperiences.push({ _id, company, companyName, updatedDate, countPosition, positions });
        }
        const count: number = await this.experiencesModel.find({ isVisible: true }).count();
        return { count, data: completeExperiences }
    }
    async getAllProjects(): Promise<DataResponse<Project>> {
        const projects: Project[] = await this.projectsModel.find({ isVisible: true })
            .populate({
                path: 'developerRolesId',
                select: '_id roleName updatedDate'
            })
            .populate({
                path: 'hardSkillsId',
                select: '_id technology selfRate amountPrjs imgUrl skillType updatedDate'
            });
        const count: number = await this.projectsModel.find().count({ isVisible: true });
        return { count, data: projects }
    }
    async getAllHardSkills(skillTypeParam: ValidSkillTypes): Promise<DataResponse<HardSkill>> {
        const hardskills: HardSkill[] = await this.hardskillsModel.find({ skillType: skillTypeParam, isVisible: true })
            .select('_id technology selfRate amountPrjs imgUrl knowledges skillType updatedDate');
        const count: number = await this.hardskillsModel.find({ skillType: skillTypeParam, isVisible: true }).count();
        return { count, data: hardskills }
    }
    async getAllAlbums(): Promise<DataResponse<Album>> {
        const albums = await this.albumsModel.find({ isVisible: true })
            .select('_id albumName description updatedDate');
        let completeAlbums = [];
        for (const album of albums) {
            const { _id, albumName, description, updatedDate } = album;
            const countPhotos = await this.photosModel.find({ albumId: album, isVisible: true }).count();
            const photos = await this.photosModel.find({ albumId: album, isVisible: true })
                .select('_id imgUrl description updatedDate');
            completeAlbums.push({ _id, albumName, description, updatedDate, countPhotos, photos });
        }
        const count: number = await this.albumsModel.find({ isVisible: true }).count();
        return { count, data: completeAlbums }
    }
}