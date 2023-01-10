import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {

    _id: string;

    @Prop({
        type: String,
        required: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        index: true
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        minlength: 6,
    })
    password: string;

    @Prop({
        type: Array,
        required: true,
        default: ['user']
    })
    roles: string[];

    @Prop({
        type: Boolean,
        required: true,
        default: true
    })
    isActive: boolean;

    @Prop({
        type: Date,
        default: new Date()
    })
    createdBy?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    lastUpdateBy?: User;
}

export const UserSchema = SchemaFactory.createForClass(User);