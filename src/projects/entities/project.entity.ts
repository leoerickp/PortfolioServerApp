import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DeveloperRole } from '../../developer-roles/entities/developer-role.entity';
import { Languages } from '../../common/entities/languages.entity';
import { HardSkill } from '../../hard-skills/entities/hard-skill.entity';

@Schema()
export class Project {

    _id: string;

    @Prop({
        type: String,
        required: true,
        minlength: 2,
    })
    projectName: string;

    @Prop({
        type: Object,
    })
    projectTitle: Languages;

    @Prop({
        type: Object
    })
    company?: Languages;

    @Prop({
        type: Date,
        required: true
    })
    projectDate?: string;



    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeveloperRole' }],
        required: true
    })
    developerRolesId: DeveloperRole[];


    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HardSkill' }],
        required: true
    })
    hardSkillsId: HardSkill[];

    @Prop({
        type: Object
    })
    summary: Languages;

    @Prop({
        type: Boolean,
        required: true,
        default: true
    })
    isVisible: boolean;

    @Prop({
        type: Date,
        default: new Date(),
    })
    updatedDate: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    lastUpdateBy?: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);