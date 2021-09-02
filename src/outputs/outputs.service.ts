import { Injectable } from '@nestjs/common';
import { CreateOutputDto } from './dto/create-output.dto';
import { UpdateOutputDto } from './dto/update-output.dto';

@Injectable()
export class OutputsService {
  create(createOutputDto: CreateOutputDto) {
    return 'This action adds a new output';
  }

  findAll() {
    return `This action returns all outputs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} output`;
  }

  update(id: number, updateOutputDto: UpdateOutputDto) {
    return `This action updates a #${id} output`;
  }

  remove(id: number) {
    return `This action removes a #${id} output`;
  }
}
