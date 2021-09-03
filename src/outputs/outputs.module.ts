import { Module } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { OutputsController } from './outputs.controller';
import { Output } from './entities/output.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Output])
  ],
  controllers: [OutputsController],
  providers: [OutputsService]
})
export class OutputsModule {}
