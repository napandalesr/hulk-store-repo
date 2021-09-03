import { Module } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { OutputsController } from './outputs.controller';
import { Output } from './entities/output.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Output]),
    ProductsModule
  ],
  controllers: [OutputsController],
  providers: [OutputsService]
})
export class OutputsModule {}
