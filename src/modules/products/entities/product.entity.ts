import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type ProductDocument = Product & Document;

@SchemaType()
@ObjectType()
class Variants {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

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
}

const VariantsSchema = SchemaFactory.createForClass(Variants);

@SchemaType()
@ObjectType()
export class Product {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  description: string;

  @Prop({ ref: 'categories' })
  @Field(() => ID)
  category: Schema.Types.ObjectId;

  @Prop({ ref: 'stores' })
  @Field(() => ID)
  story: Schema.Types.ObjectId;

  @Prop({ type: [VariantsSchema] })
  @Field(() => [Variants])
  variants: Variants[];

  @Prop({ default: new Date() })
  @Field()
  updated_at: Date;

  @Prop({ default: new Date() })
  @Field()
  created_at: Date;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(mongoosePaginate);

export { ProductSchema };
