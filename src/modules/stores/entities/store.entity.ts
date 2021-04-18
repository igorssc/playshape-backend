import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Address } from '../../../common/entities/address.entity';
import { ProfilePicture } from '../../../common/entities/profile-picture.entity';
import { StatusStore } from '../../../enuns/status-store.enum';

export type StoreDocument = Store & Document;

@SchemaType()
@ObjectType()
export class Store {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Prop({ trim: true })
  @Field()
  name: string;

  @Prop({ unique: true })
  @Field()
  slug: string;

  @Prop({ unique: true, trim: true })
  @Field()
  email: string;

  @Prop({ unique: true, sparse: true })
  @Field({ nullable: true })
  cnpj: string;

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
  @Field()
  @HideField()
  password: string;

  @Prop({ default: new Date() })
  @Field()
  updated_at: Date;

  @Prop()
  @Field({ nullable: true })
  last_login: Date;

  @Prop({ default: new Date() })
  @Field()
  created_at: Date;

  @Prop({ default: StatusStore.Active })
  @Field()
  status: StatusStore;
}

const StoreSchema = SchemaFactory.createForClass(Store);
StoreSchema.plugin(mongoosePaginate);

export { StoreSchema };
