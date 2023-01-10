import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Languages } from '../../common/entities/languages.entity';

@Schema()
export class Experience {
    _id: string;

    @Prop({
        type: String,
        required: true
    })
    company: string;

    @Prop({
        type: Object
    })
    companyName: Languages;

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

export const ExperienceSchema = SchemaFactory.createForClass(Experience);