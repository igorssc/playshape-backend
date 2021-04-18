import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Address } from '../../../common/entities/address.entity';
import { ProfilePicture } from '../../../common/entities/profile-picture.entity';
import { ActionsUser } from '../../../enuns/actions-user.enum';
import { StatusUser } from '../../../enuns/status-user.enum';

export type UserDocument = User & Document;

@SchemaType()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Prop({ trim: true })
  @Field()
  name: string;

  @Prop({ unique: true, trim: true })
  @Field()
  email: string;

  @Prop({ unique: true, sparse: true })
  @Field({ nullable: true })
  cpf: string;

  @Prop()
  @Field({ nullable: true })
  phone: string;

  @Prop()
  @Field(() => [Address], { nullable: true })
  address: Address[];

  @Prop()
  @Field({ nullable: true })
  profile_picture: ProfilePicture;

  @Prop()
  password: string;

  @Prop({ default: false })
  @Field()
  isAdmin: boolean;

  @Prop({ default: new Date() })
  @Field()
  updated_at: Date;

  @Prop()
  @Field({ nullable: true })
  last_login: Date;

  @Prop({ default: new Date() })
  @Field()
  created_at: Date;

  @Prop({ default: StatusUser.Active })
  @Field()
  status: StatusUser;

  @Prop({ default: [] })
  @Field(() => [String])
  permissions: ActionsUser[];
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);

export { UserSchema };
