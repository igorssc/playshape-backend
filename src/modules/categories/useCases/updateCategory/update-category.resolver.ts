import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Role } from '../../../../decorators/roles.decorator';
import { ActionsUser } from '../../../../enuns/actions-user.enum';
import { AuthenticateGuard } from '../../../../guards/authenticate-user.guard';
import { UpdateCategoryDTO } from '../../dtos/update-category.dto';
import { UpdateCategoryInput } from '../../inputs/update-category.input';
import { UpdateCategoryService } from './update-category.service';

@Resolver()
class UpdateCategoryResolver {
  constructor(private updateCategoryService: UpdateCategoryService) {}

  @Mutation(() => UpdateCategoryDTO)
  @Role(ActionsUser.UpdateCategories)
  @UseGuards(AuthenticateGuard)
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    const categories = await this.updateCategoryService.execute(input.category);

    return categories;
  }
}

export { UpdateCategoryResolver };
