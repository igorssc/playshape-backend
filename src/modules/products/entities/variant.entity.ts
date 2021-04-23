import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Picture } from '../../../common/entities/picture.entity';

export type VariantDocument = Variant & Document;

@SchemaType()
@ObjectType()
export class Variant {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Prop({ ref: 'products', required: true })
  @Field(() => ID)
  product: Schema.Types.ObjectId;

  @Prop()
  @Field()
  size: string;

  @Prop()
  @Field()
  flavor: string;

  @Prop()
  @Field()
  price: number;

  @Prop()
  @Field({ nullable: true })
  promotion: number;

  @Prop()
  @Field()
  quantity: number;

  @Prop()
  @Field(() => Picture)
  picture: Picture;

  @Prop({ default: new Date() })
  @Field()
  updated_at: Date;

  @Prop({ default: new Date() })
  @Field()
  created_at: Date;
}

const VariantSchema = SchemaFactory.createForClass(Variant);
VariantSchema.plugin(mongoosePaginate);

export { VariantSchema };
