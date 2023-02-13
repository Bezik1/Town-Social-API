import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CoordinateRole } from 'src/constans';
export type CoordinatetDocument = Coordinate & Document;

@Schema()
export class Coordinate extends Document {
    @Prop({ required: true })
    latitude: number

    @Prop({ required: true })
    longitude: number

    @Prop({
        type: String,
        enum: CoordinateRole,
    })
    role: string

    @Prop({ required: true })
    description: string
}

export const CoordinateSchema = SchemaFactory.createForClass(Coordinate);