import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Languages } from '../../common/entities/languages.entity';
import { User } from '../../users/entities/user.entity';
import { Album } from '../../albums/entities/album.entity';
@Schema()
export class Photo {

    _id: string;

    @Prop({
        type: String,
        required: true,
        unique: true
    })
    imgUrl: string;

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
    albumId: Album;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    lastUpdateBy: User;
}
export const PhotoSchema = SchemaFactory.createForClass(Photo);