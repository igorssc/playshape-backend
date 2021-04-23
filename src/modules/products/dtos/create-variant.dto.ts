import { ObjectType } from '@nestjs/graphql';
import { VariantDTO } from './variant.dto';

@ObjectType()
export default class CreateVariantDTO extends VariantDTO {}
