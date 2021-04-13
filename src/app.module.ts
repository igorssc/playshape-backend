import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { UsersModule } from './modules/accounts/user.module';
import { CategoryModule } from './modules/categories/category.module';

@Module({
  imports: [
    CategoryModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.2cwqu.mongodb.net/${process.env.DB_NAME}Database?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    ),
    GraphQLModule.forRoot({
      path: '/graphql',
      autoSchemaFile: true,
      introspection: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error?.extensions?.exception?.response?.message ||
            error?.message ||
            'Internal server error',
          extensions: { status: error?.extensions?.exception?.status || 500 },
        };
        return graphQLFormattedError;
      },
      uploads: {
        maxFileSize: 20000000, // 20 MB
        maxFiles: 5,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
