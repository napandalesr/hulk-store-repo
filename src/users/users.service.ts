import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const userExist =  await this.userRepository.findOne({username:createUserDto.username});
    if(userExist) throw new BadRequestException('El nombre de usuario ya está registrado');
    const newUser = await this.userRepository.create(createUserDto);
    const userSave = await this.userRepository.save(newUser);
    delete userSave.password;
    return userSave;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const userExist =  await this.userRepository.findOne({id});
    if(!userExist) throw new BadRequestException('El usuario indicado no existe');
    return userExist;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userExist =  await this.userRepository.findOne({id});
    if(!userExist) throw new BadRequestException('El usuario indicado no existe');
    const userUpdate = await this.userRepository.update(id,updateUserDto);
    if(userUpdate.affected>0)
    return {
      message:"Datos actualizados correctamente",
      data: userExist
    }
    throw InternalServerErrorException;
  }

  async remove(id: number) {
    const userExist =  await this.userRepository.findOne({id});
    if(!userExist) throw new BadRequestException('El usuario indicado no existe');
    const userDelete = await this.userRepository.delete({id});
    if(userDelete.affected>0) 
    return {
      message:"Usuario eliminado correctamente",
    }
    return InternalServerErrorException;
  }

  async findByUsername(data){
    return await this.userRepository
    .createQueryBuilder('user')
    .where(data)
    .addSelect('user.password')
    .getOne();
  }
}
