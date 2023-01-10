import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Languages {

    @Prop({
        type: String
    })
    es?: string;

    @Prop({
        type: String
    })
    en?: string;
}

export const LanguagesSchema = SchemaFactory.createForClass(Languages);