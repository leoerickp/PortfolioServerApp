import { Languages } from '../../common/entities/languages.entity';
import { DateType } from './date.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HardSkill } from '../../hard-skills/entities/hard-skill.entity';
import { User } from '../../users/entities/user.entity';
import { Experience } from '../../experiences/entities/experience.entity';

@Schema()
export class Position {

    _id: string;

    @Prop({
        type: Object,
        required: true
    })
    positionName: Languages;

    @Prop({
        type: Object,
        required: true
    })
    date: DateType;

    @Prop({
        type: Array,
        required: true
    })
    achievements: Languages[];

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HardSkill' }],
        required: true
    })
    hardSkillsId: HardSkill[];

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' })
    experienceId: Experience;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    lastUpdateBy: User;
}

export const PositionSchema = SchemaFactory.createForClass(Position);