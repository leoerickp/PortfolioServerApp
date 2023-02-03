import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Languages } from "src/common/entities/languages.entity";
import { User } from "src/users/entities/user.entity";
@Schema()
export class Profile {
    @Prop({
        type: String,
        required: true
    })
    name: string;

    @Prop({
        type: Date,
        required: true,
        default: new Date()
    })
    birthDate: string;

    @Prop({
        type: String,
        required: true
    })
    englishLevel: string;

    @Prop({
        type: String,
        required: true
    })
    email: string;

    @Prop({
        type: String,
        required: true
    })
    cellphone: string;

    @Prop({
        type: String,
        required: true
    })
    githubRepository: string;

    @Prop({
        type: String,
        required: true
    })
    linkedIn: string;

    @Prop({
        type: String,
        required: true
    })
    city: string;

    @Prop({
        type: String,
    })
    facebook: string;

    @Prop({
        type: String,
    })
    imgUrl: string;

    @Prop({
        type: Object
    })
    aboutMe: Languages;

    @Prop({
        type: Date,
        default: new Date(),
    })
    updatedDate: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    lastUpdateBy?: User;
}
export const ProfileSchema = SchemaFactory.createForClass(Profile);