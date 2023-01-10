import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Languages } from "src/common/entities/languages.entity";
import { User } from "src/users/entities/user.entity";
import { ValidSkillTypes } from "../enums/valid-skilltypes.enum";

@Schema()
export class HardSkill {
    _id: string;

    @Prop({
        type: String,
        unique: true,
        required: true
    })
    technology: string;

    @Prop({
        type: Number,
        required: true,
        default: 0
    })
    selfRate: number;

    @Prop(
        {
            type: Number,
            required: true,
            default: 0
        }
    )
    amountPrjs: number;

    @Prop({
        type: String,
    })
    imgUrl?: string;

    @Prop({
        type: Array
    })
    knowledges?: Languages[];

    @Prop({
        type: Boolean,
        required: true,
        default: true
    })
    isVisible: boolean;

    @Prop({
        type: String,
        required: true,
        default: 'frontend'
    })
    skillType: ValidSkillTypes;

    @Prop({
        type: Date,
        default: new Date()
    })
    updatedDate?: string;

    //@Field(() => User, { nullable: true })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    lastUpdateBy?: User;

}


export const HardSkillSchema = SchemaFactory.createForClass(HardSkill);
