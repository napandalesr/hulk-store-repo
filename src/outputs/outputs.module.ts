import { Module } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { OutputsController } from './outputs.controller';

@Module({
  controllers: [OutputsController],
  providers: [OutputsService]
})
export class OutputsModule {}
