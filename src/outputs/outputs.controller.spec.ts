import { Test, TestingModule } from '@nestjs/testing';
import { OutputsController } from './outputs.controller';
import { OutputsService } from './outputs.service';

describe('OutputsController', () => {
  let controller: OutputsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutputsController],
      providers: [OutputsService],
    }).compile();

    controller = module.get<OutputsController>(OutputsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
