import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

import { Actions } from '../../../enuns/actions.enum';

export type UserDocument = User & Document;

@SchemaType()
class ProfilePicture {
  @Prop()
  url: string;
  @Prop()
  filename: string;
}

@SchemaType()
export class User {
  _id: Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  profile_picture: ProfilePicture;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: [] })
  permissions: Actions[];
}

export const UserSchema = SchemaFactory.createForClass(User);
