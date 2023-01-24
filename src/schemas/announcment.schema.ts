import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Rang } from 'src/constans';
import { Comment } from 'src/interfaces/comment.interface';
import { Date } from 'src/interfaces/date.interface';
export type AnnouncmentDocument = Announcment & Document;

@Schema()
export class Announcment extends Document {
    @Prop({ maxlength: 20, minlength: 3 })
    author: string;

    @Prop({ maxlength: 2000 })
    content: string

    @Prop([String])
    likes: string[]

    @Prop([Comment])
    comments: Comment[]

    @Prop({
        type: String,
        enum: Rang,
    })
    rang: Rang

    @Prop({ type: Date })
    date: Date
}

export const AnnouncmentSchema = SchemaFactory.createForClass(Announcment);