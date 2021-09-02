import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { CreateOutputDto } from './dto/create-output.dto';
import { UpdateOutputDto } from './dto/update-output.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Outputs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('outputs')
export class OutputsController {
  constructor(private readonly outputsService: OutputsService) {}

  @Post()
  create(@Body() createOutputDto: CreateOutputDto) {
    return this.outputsService.create(createOutputDto);
  }

  @Get()
  findAll() {
    return this.outputsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outputsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutputDto: UpdateOutputDto) {
    return this.outputsService.update(+id, updateOutputDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outputsService.remove(+id);
  }
}
