import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/users/entities/user.entity";

@Schema()
export class DeveloperRole {

    _id: string;

    @Prop({
        type: String,
        unique: true,
        required: true,
        minlength: 2,
    })
    roleName: string;

    @Prop({
        type: Date,
        default: new Date(),
    })
    updatedDate: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    lastUpdateBy?: User;
}

export const DeveloperRoleSchema = SchemaFactory.createForClass(DeveloperRole);
