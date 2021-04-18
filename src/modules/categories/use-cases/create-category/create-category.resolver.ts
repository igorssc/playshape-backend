import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from '../../../../decorators/roles.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { CreateCategoryDTO } from '../../dtos/create-category.dto';
import { CreateCategoryInput } from '../../inputs/create-category.input';
import { CreateCategoriesService } from './create-category.service';

@Resolver()
export class CreateCategoryResolver {
  constructor(private createCategoriesService: CreateCategoriesService) {}

  @Mutation(() => CreateCategoryDTO)
  @Role(ActionsUser.CreateCategories)
  @UseGuards(AuthenticateGuard)
  async createCategory(@Args('input') input: CreateCategoryInput) {
    const createdCategory = await this.createCategoriesService.execute(input);

    return createdCategory;
  }
}
