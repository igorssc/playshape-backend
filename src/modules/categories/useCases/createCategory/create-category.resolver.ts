import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from '../../../../decorators/roles.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { ListCategoryDTO } from '../../dtos/list-category.dto';
import { CreateCategoryInput } from '../../inputs/create-category.input';
import { CreateCategoriesService } from './create-category.service';

@Resolver()
class CreateCategoryResolver {
  constructor(private createCategoriesService: CreateCategoriesService) {}

  @Mutation(() => ListCategoryDTO)
  @Role(ActionsUser.CreateCategories)
  @UseGuards(AuthenticateGuard)
  async createCategory(@Args('input') input: CreateCategoryInput) {
    const createdCategory = await this.createCategoriesService.execute(
      input.category,
    );
    return createdCategory;
  }
}

export { CreateCategoryResolver };
