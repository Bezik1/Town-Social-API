import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/constans';
import { Loggined } from 'src/interfaces/loggined.interface';
export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ unique: true, maxlength: 20, minlength: 3, required: true })
  username: string;

  @Prop({ unique: true, maxlength: 50, minlength: 5, required: true })
  email: string;

  @Prop({ required: true, minLength: 7 })
  password: string;

  @Prop()
  picturePath: string

  @Prop([{
    type: String,
    enum: Role,
  }])
  roles: string[]

  @Prop()
  loggined: Loggined
}

export const UserSchema = SchemaFactory.createForClass(User);