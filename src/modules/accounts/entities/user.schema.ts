import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ActionsUser } from '../../../enuns/actions-user.enum';
import { StatusUser } from '../../../enuns/status-user.enum';

export type UserDocument = User & Document;

@SchemaType()
class ProfilePicture {
  @Prop()
  url: string;
  @Prop()
  filename: string;
}

@SchemaType()
class Address {
  @Prop()
  street: string;
  @Prop()
  number: number;
  @Prop()
  neighborhood: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  zipCode: string;
}

@SchemaType()
export class User {
  _id: Schema.Types.ObjectId;

  @Prop({ trim: true })
  name: string;

  @Prop({ unique: true, trim: true })
  email: string;

  @Prop({ unique: true })
  cpf: string;

  @Prop()
  phone: string;

  @Prop()
  address: Address[];

  @Prop()
  profile_picture: ProfilePicture;

  @Prop()
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop()
  last_login: Date;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: 'active' })
  status: StatusUser;

  @Prop({ default: [] })
  permissions: ActionsUser[];
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);

export { UserSchema };
