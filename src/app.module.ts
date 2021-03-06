import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE, HOST, PASSWORD, PORT, USERNAME } from './utils/constants';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { EntriesModule } from './entries/entries.module';
import { OutputsModule } from './outputs/outputs.module';
import { CombinationsModule } from './combinations/combinations.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(HOST),
        port: parseInt(config.get<string>(PORT),10),
        username: config.get<string>(USERNAME),
        password: config.get<string>(PASSWORD),
        database: config.get<string>(DATABASE),
        entities: [__dirname+'./**/**/*entity{.js,.ts}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file'
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    EntriesModule,
    OutputsModule,
    CombinationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
