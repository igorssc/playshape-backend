import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { StatusCategory } from '../../../enuns/status-category';

export type CategoryDocument = Category & Document;

@SchemaType()
@ObjectType()
export class Category {
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Prop({ unique: true })
  @Field()
  name: string;

  @Prop()
  @Field({ nullable: true })
  description: string;

  @Prop()
  @Field()
  status: StatusCategory.Active;

  @Prop({ default: new Date() })
  @Field()
  updated_at: Date;

  @Prop({ default: new Date() })
  @Field()
  created_at: Date;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.plugin(mongoosePaginate);

export { CategorySchema };
