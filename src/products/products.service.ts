import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    const productExist = await this.productRepository.findOne({name:createProductDto.name});
    if(productExist) throw new BadRequestException('Este producto ya se encuentra registrado');
    const newProduct = await this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    let data=await this.productRepository.find({relations:["idCategory"]});
    data.map(item=>item['nameCategory']=item.idCategory['name']);
    return data;
  }

  async findOne(id: number) {
    const productExist = await this.productRepository.findOne({id});
    if(!productExist) throw new BadRequestException('El producto seleccionado no existe')
    return productExist;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let productExist = await this.productRepository.findOne({id});
    if(!productExist) throw new BadRequestException('El producto selecionado no existe')
    const productUpdate = await this.productRepository.update(id,updateProductDto);
    if(productUpdate.affected>0){
      productExist = await this.productRepository.findOne({id});
      return {
        message:"Datos actualizados correctamente",
        data: productExist
      }
    }
    throw InternalServerErrorException;
  }

  async remove(id: number) {
    const productExist =  await this.productRepository.findOne({id});
    if(!productExist) throw new BadRequestException('El producto indicado no existe');
    const productDelete = await this.productRepository.delete({id});
    if(productDelete.affected>0) 
    return {
      message:"Producto eliminado correctamente",
    }
    return InternalServerErrorException;
  }

  async addExistenses(id:number, amount:number) {
    let productExist = await this.productRepository.findOne({id});
    const newExistences = productExist.existencias+amount;
    const productUpdate = await this.productRepository.update(id,{existencias:newExistences});
    if(productUpdate.affected>0){
      return true;
    }
    throw InternalServerErrorException;
  }

  async deleteExistenses(id:number,amount:number) {
    let productExist = await this.productRepository.findOne({id});
    const newExistences = productExist.existencias-amount;
    const productUpdate = await this.productRepository.update(id,{existencias:newExistences});
    if(productUpdate.affected>0){
      return true;
    }
    throw InternalServerErrorException;
  }
}
