import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Languages } from '../../common/entities/languages.entity';

@Schema()
export class Album {

    _id: string;

    @Prop({
        type: String,
        unique: true,
        required: true,
        minlength: 2
    })
    albumName: string;

    @Prop({
        type: Object
    })
    description?: Languages;

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
    lastUpdateBy: User;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);