import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOutputDto } from './dto/create-output.dto';
import { UpdateOutputDto } from './dto/update-output.dto';
import { Output } from './entities/output.entity';

@Injectable()
export class OutputsService {
  constructor(
    @InjectRepository(Output)
    private readonly outputRespository: Repository<Output>
  ){}

  async create(createOutputDto: CreateOutputDto) {
    createOutputDto['costTotal']=createOutputDto.units*createOutputDto.costUnit;
    const newEntry = await this.outputRespository.create(createOutputDto);
    return await this.outputRespository.save(newEntry);
  }

  async findAll() {
    let data=await this.outputRespository.find({relations:["idProduct","idUser"]});
    data.map(item=>item['nameUser']=item.idUser['name']);
    data.map(item=>item['nameProduct']=item.idProduct['name']);
    return data;
  }

  async findOne(id: number) {
    const entryExist = await this.outputRespository.findOne({id});
    if(!entryExist) throw new BadRequestException('La salida selecionada no existe')
    return entryExist;
  }

  async update(id: number, updateOutputDto: UpdateOutputDto) {
    const entryExist = this.outputRespository.findOne({id});
    if(!entryExist) throw new BadRequestException('La Salida selecionada no existe')
    updateOutputDto['costTotal']=updateOutputDto.units*updateOutputDto.costUnit;
    const entryUpdate = await this.outputRespository.update(id,updateOutputDto);
    if(entryUpdate.affected>0)
    return {
      message:"Datos actualizados correctamente",
      data: entryExist
    }
    throw InternalServerErrorException;
  }

  async remove(id: number) {
    const entryExist =  await this.outputRespository.findOne({id});
    if(!entryExist) throw new BadRequestException('La entrada indica no existe');
    const entryDelete = await this.outputRespository.delete({id});
    if(entryDelete.affected>0) 
    return {
      message:"Salida eliminada correctamente",
    }
    return InternalServerErrorException;
  }
}
