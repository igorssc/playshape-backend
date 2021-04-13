import { Prop, Schema as SchemaType, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type CategoryDocument = Category & Document;

@SchemaType()
export class Category {
  _id: Schema.Types.ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: new Date() })
  updated_at: Date;

  @Prop({ default: new Date() })
  created_at: Date;
}

const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.plugin(mongoosePaginate);

export { CategorySchema };
