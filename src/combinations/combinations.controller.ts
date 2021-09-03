import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CombinationsService } from './combinations.service';
import { CreateCombinationDto } from './dto/create-combination.dto';
import { UpdateCombinationDto } from './dto/update-combination.dto';

@ApiTags('Combinations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('combinations')
export class CombinationsController {
  constructor(private readonly combinationsService: CombinationsService) {}

  @Post()
  create(@Body() createCombinationDto: CreateCombinationDto) {
    return this.combinationsService.create(createCombinationDto);
  }

  @Get()
  findAll() {
    return this.combinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combinationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombinationDto: UpdateCombinationDto) {
    return this.combinationsService.update(+id, updateCombinationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combinationsService.remove(+id);
  }
}
