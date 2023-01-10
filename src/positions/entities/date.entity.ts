import { Prop } from '@nestjs/mongoose';

export class DateType {

    @Prop({
        type: Date
    })
    from?: string;

    @Prop({
        type: Date
    })
    to?: string;
}