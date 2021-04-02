import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/accounts/user.module';
import 'dotenv/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.2cwqu.mongodb.net/${process.env.DB_NAME}Database?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    GraphQLModule.forRoot({
      path: '/graphql',
      autoSchemaFile: true,
      introspection: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error.extensions.exception.response.message ||
            error.message ||
            'Internal server error',
          extensions: { status: error.extensions.exception.status || 500 },
        };
        return graphQLFormattedError;
      },
      uploads: {
        maxFileSize: 20000000, // 20 MB
        maxFiles: 5,
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
