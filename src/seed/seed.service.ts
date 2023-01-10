import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HardSkill } from 'src/hard-skills/entities/hard-skill.entity';
import { User } from 'src/users/entities/user.entity';
import { BACKEND_SKILLS, USERS, ROLES, FRONTEND_SKILLS, OTHER_SKILL, DBENGINES, EXPERIENCES, PROJECTS, PHOTOS } from './data/seed.data';
import { DeveloperRole } from '../developer-roles/entities/developer-role.entity';
import { UsersService } from '../users/users.service';
import { Experience } from '../experiences/entities/experience.entity';
import { Position } from '../positions/entities/position.entity';
import { Project } from '../projects/entities/project.entity';
import { Album } from '../albums/entities/album.entity';
import { Photo } from '../photos/entities/photo.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(User.name)
        private readonly usersModel: Model<User>,
        private readonly usersService: UsersService,
        @InjectModel(HardSkill.name)
        private readonly hardSkillsModel: Model<HardSkill>,
        @InjectModel(DeveloperRole.name)
        private readonly developersModel: Model<DeveloperRole>,
        @InjectModel(Experience.name)
        private readonly experiencesModel: Model<Experience>,
        @InjectModel(Position.name)
        private readonly positionsModel: Model<Experience>,
        @InjectModel(Project.name)
        private readonly projectModel: Model<Project>,
        @InjectModel(Album.name)
        private readonly albumsModel: Model<Album>,
        @InjectModel(Photo.name)
        private readonly photosModel: Model<Photo>
    ) { }

    async executeSeed() {
        if (process.env.STATE !== 'dev') {
            throw new UnauthorizedException('This action is not authorized!')
        }
        await this.deleteDB();
        const user = await this.loadUsers();
        const role = await this.loadDeveloperRoles(user);
        const skill = await this.loadHardSkill(user);
        await this.loadExperiences(user, skill);
        await this.loadProjects(user, role, skill);
        await this.loadAlbums(user);
        return 'Seed was loaded successfully!';
    }

    private async deleteDB() {
        await this.usersModel.deleteMany({});
        await this.developersModel.deleteMany({});
        await this.hardSkillsModel.deleteMany({});
        await this.positionsModel.deleteMany({});
        await this.experiencesModel.deleteMany({});
        await this.projectModel.deleteMany({});
        await this.photosModel.deleteMany({});
        await this.albumsModel.deleteMany({});
    }

    private async loadUsers(): Promise<User> {
        const users = [];
        for (const user of USERS) {
            users.push(await this.usersService.create({
                name: user.fullName,
                email: user.email,
                password: user.password,
            }));
        }

        return users[0];
    }
    private async loadDeveloperRoles(user: User) {
        const dataRoles = [];
        for (const role of ROLES) {
            dataRoles.push({
                roleName: role.roleName,
                lastUpdateBy: user
            });
        }
        const roles = await this.developersModel.insertMany(dataRoles);
        return roles[0];
    }

    private async loadHardSkill(user: User) {
        const dataSkills = [];
        dataSkills.push(...this.loadFrontEndSkill(user));
        dataSkills.push(...this.loadBackEndSkill(user));
        dataSkills.push(...this.loadDbEnginesSkill(user));
        dataSkills.push(...this.loadOtherSkill(user));
        const skills = await this.hardSkillsModel.insertMany(dataSkills)
        return skills[0];
    }

    private loadBackEndSkill(user: User) {
        const dataSkills = [];
        for (const skill of BACKEND_SKILLS) {
            dataSkills.push({
                technology: skill.technology,
                selfRate: skill.selfRate,
                amountPrjs: skill.amountPrjs,
                knowledges: skill.knowledges.map(knowledge => ({ en: knowledge })),
                skillType: 'backend',
                imgUrl: skill.imgUrl,
                lastUpdateBy: user
            })
        }
        return dataSkills;
    }
    private loadFrontEndSkill(user: User) {
        const dataSkills = [];
        for (const skill of FRONTEND_SKILLS) {
            dataSkills.push({
                technology: skill.technology,
                selfRate: skill.selfRate,
                amountPrjs: skill.amountPrjs,
                knowledges: skill.knowledges.map(knowledge => ({ en: knowledge })),
                skillType: 'frontend',
                imgUrl: skill.imgUrl,
                lastUpdateBy: user
            })
        }
        return dataSkills;
    }
    private loadOtherSkill(user: User) {
        const dataSkills = [];
        for (const skill of OTHER_SKILL) {
            dataSkills.push({
                technology: skill.name,
                skillType: 'otherTech',
                imgUrl: skill.imgUrl,
                lastUpdateBy: user
            })
        }
        return dataSkills;
    }
    private loadDbEnginesSkill(user: User) {
        const dataSkills = [];
        for (const skill of DBENGINES) {
            dataSkills.push({
                technology: skill.name,
                skillType: 'dbEngines',
                imgUrl: skill.imgUrl,
                knowledges: skill.knowledges.map(knowledge => ({ en: knowledge })),
                lastUpdateBy: user
            })
        }
        return dataSkills;
    }

    private async loadExperiences(user: User, skill: HardSkill) {
        //let newExperience: any;
        const dataPositions = [];
        for (const experience of EXPERIENCES) {
            const newExperience = await this.experiencesModel.create({
                company: 'CO',
                companyName: { en: experience.company },
                lastUpdateBy: user
            });
            for (const position of experience.positions) {
                dataPositions.push({
                    positionName: { en: position.position },
                    date: { from: new Date().toDateString(), to: new Date().toDateString() },
                    achievements: position.achievements.map(achievemnt => ({ en: achievemnt })),
                    hardSkillsId: skill,
                    experienceId: newExperience,
                    lastUpdateBy: user,
                })
            }
        }
        await this.positionsModel.insertMany(dataPositions);
    }

    private async loadProjects(user: User, role: DeveloperRole, skill: HardSkill) {
        const dataProjects = [];
        for (const project of PROJECTS) {
            dataProjects.push({
                projectName: project.project,
                projectTitle: { en: project.project },
                company: { en: project.company },
                projectDate: new Date(project.date + '-01-01'),
                developerRolesId: [role],
                hardSkillsId: [skill],
                summary: { en: project.summary },
                lastUpdateBy: user
            });
        }
        await this.projectModel.insertMany(dataProjects);
    }

    private async loadAlbums(user: User) {
        const album = await this.albumsModel.create({
            albumName: 'Portada',
            lastUpdateBy: user
        });
        await this.loadPhotos(user, album);
    }
    private async loadPhotos(user: User, album: Album) {
        const dataPhotos = [];
        for (const photo of PHOTOS) {
            dataPhotos.push({
                imgUrl: photo.imgUrl,
                albumId: album,
                lastUpdateBy: user
            });
        }
        await this.photosModel.insertMany(dataPhotos);
    }

}
