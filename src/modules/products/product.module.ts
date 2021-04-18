import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductsRepository } from './repositories/implementatios/product.repository';
import { CreateProductResolver } from './use-cases/create-product/create-product.resolver';
import { CreateProductService } from './use-cases/create-product/create-product.service';
import { FindProductResolver } from './use-cases/find-product/find-product.resolver';
import { FindProductService } from './use-cases/find-product/find-product.service';
import { FindProductsByNameResolver } from './use-cases/find-products-by-name/find-products-by-name.resolver';
import { FindProductsByNameService } from './use-cases/find-products-by-name/find-products-by-name.service';
import { ListProductsResolver } from './use-cases/list-products/list-products.resolver';
import { ListProductsService } from './use-cases/list-products/list-products.service';
import { UpdateProductResolver } from './use-cases/update-product/update-product.resolver';
import { UpdateProductService } from './use-cases/update-product/update-product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [],
  providers: [
    ProductsRepository,
    CreateProductResolver,
    CreateProductService,
    FindProductResolver,
    FindProductService,
    FindProductsByNameResolver,
    FindProductsByNameService,
    ListProductsResolver,
    ListProductsService,
    UpdateProductResolver,
    UpdateProductService,
  ],
})
export class ProductModule {}
