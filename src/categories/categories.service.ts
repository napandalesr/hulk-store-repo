import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExist = await this.categoryRepository.findOne({name:createCategoryDto.name});
    if(categoryExist) throw new BadRequestException('Está categoria ya se encuentra registrada');
    const newCategory = await this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const categoryExist = await this.categoryRepository.findOne({id});
    if(!categoryExist) throw new BadRequestException('La categoria selecionada no existe')
    return categoryExist;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    let categoryExist = await this.categoryRepository.findOne({id});
    if(!categoryExist) throw new BadRequestException('La categoria selecionada no existe')
    const categoryUpdate = await this.categoryRepository.update(id,updateCategoryDto);
    if(categoryUpdate.affected>0){
      categoryExist = await this.categoryRepository.findOne({id});
      return {
        message:"Datos actualizados correctamente",
        data: categoryExist
      }
    }
    throw InternalServerErrorException;
  }

  async remove(id: number) {
    const categoryExist =  await this.categoryRepository.findOne({id});
    if(!categoryExist) throw new BadRequestException('La categoria indicada no existe');
    const userDelete = await this.categoryRepository.delete({id});
    if(userDelete.affected>0) 
    return {
      message:"Categoria eliminada correctamente",
    }
    return InternalServerErrorException;
  }
}
