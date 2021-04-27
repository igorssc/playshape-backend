import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../accounts/user.module';
import { CategoryModule } from '../categories/category.module';
import { StoreModule } from '../stores/store.module';
import { Product, ProductSchema } from './entities/product.entity';
import { Variant, VariantSchema } from './entities/variant.entity';
import { ProductsRepository } from './repositories/implementations/products.repository';
import { VariantsRepository } from './repositories/implementations/variants.repository';
import { CreateProductResolver } from './use-cases/create-product/create-product.resolver';
import { CreateProductService } from './use-cases/create-product/create-product.service';
import { CreateVariantResolver } from './use-cases/create-variant/create-variant.resolver';
import { CreateVariantService } from './use-cases/create-variant/create-variant.service';
import { FindProductResolver } from './use-cases/find-product/find-product.resolver';
import { FindProductService } from './use-cases/find-product/find-product.service';
import { FindProductsRelatedResolver } from './use-cases/find-products-related/find-products-related.resolver';
import { FindProductsRelatedService } from './use-cases/find-products-related/find-products-related.service';
import { FindProductsResolver } from './use-cases/find-products/find-products.resolver';
import { FindProductsService } from './use-cases/find-products/find-products.service';
import { FindVariantResolver } from './use-cases/find-variant/find-variant.resolver';
import { FindVariantService } from './use-cases/find-variant/find-variant.service';
import { ListProductsResolver } from './use-cases/list-products/list-products.resolver';
import { ListProductsService } from './use-cases/list-products/list-products.service';
import { SearchProductsResolver } from './use-cases/search-products/search-products.resolver';
import { SearchProductsService } from './use-cases/search-products/search-products.service';
import { UpdateProductResolver } from './use-cases/update-product/update-product.resolver';
import { UpdateProductService } from './use-cases/update-product/update-product.service';
import { CreateProductSlug } from './utils/create-slug';

@Module({
  imports: [
    StoreModule,
    CategoryModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Variant.name, schema: VariantSchema },
    ]),
  ],
  controllers: [],
  providers: [
    CreateProductSlug,
    ProductsRepository,
    VariantsRepository,
    CreateProductResolver,
    CreateProductService,
    FindProductResolver,
    FindProductService,
    FindVariantResolver,
    FindVariantService,
    ListProductsResolver,
    ListProductsService,
    UpdateProductResolver,
    UpdateProductService,
    CreateVariantResolver,
    CreateVariantService,
    FindProductsResolver,
    FindProductsService,
    FindProductsRelatedResolver,
    FindProductsRelatedService,
    SearchProductsResolver,
    SearchProductsService,
  ],
})
export class ProductModule {}
