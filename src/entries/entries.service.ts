import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRespository: Repository<Entry>
  ){}

  async create(createEntryDto: CreateEntryDto) {
    const newEntry = await this.entryRespository.create(createEntryDto);
    return await this.entryRespository.save(newEntry);
  }

  async findAll() {
    return await this.entryRespository.find();
  }

  async findOne(id: number) {
    const entryExist = await this.entryRespository.findOne({id});
    if(!entryExist) throw new BadRequestException('La entrada selecionada no existe')
    return entryExist;
  }

  async update(id: number, updateEntryDto: UpdateEntryDto) {
    const entryExist = this.entryRespository.findOne({id});
    if(!entryExist) throw new BadRequestException('La categiria selecionada no existe')
    const entryUpdate = await this.entryRespository.update(id,updateEntryDto);
    if(entryUpdate.affected>0)
    return {
      message:"Datos actualizados correctamente",
      data: entryExist
    }
    throw InternalServerErrorException;
  }

  async remove(id: number) {
    const entryExist =  await this.entryRespository.findOne({id});
    if(!entryExist) throw new BadRequestException('La entrada indica no existe');
    const entryDelete = await this.entryRespository.delete({id});
    if(entryDelete.affected>0) 
    return {
      message:"Entrada eliminada correctamente",
    }
    return InternalServerErrorException;
  }
}
