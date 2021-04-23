import { ObjectType } from '@nestjs/graphql';
import { VariantDTO } from './variant.dto';

@ObjectType()
export class FindVariantDTO extends VariantDTO {}
