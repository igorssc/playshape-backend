import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/accounts/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://playshape:123654@playshape.2cwqu.mongodb.net/playshapeDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    GraphQLModule.forRoot({
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: true,
      // installSubscriptionHandlers: true,
      introspection: true,
      playground: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
