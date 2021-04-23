import { ObjectType } from '@nestjs/graphql';
import { Variant } from '../entities/variant.entity';

@ObjectType()
export class VariantDTO extends Variant {}
