import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { StatusProduct } from '../../../enuns/status-product';
import { StoreDTO } from '../../stores/dtos/store.dto';

export type ProductDocument = Product & Document;

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

  @Prop()
  @Field(() => [String])
  category: string[];

  @Prop()
  @Field()
  brand: string;

  @Prop({ ref: 'stores' })
  @Field(() => StoreDTO)
  store: Schema.Types.ObjectId;

  @Prop({ default: new Date() })
  @Field()
  updated_at: Date;

  @Prop({ default: new Date() })
  @Field()
  created_at: Date;

  @Prop({ default: StatusProduct.Active })
  @Field()
  status: StatusProduct;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(mongoosePaginate);

export { ProductSchema };
