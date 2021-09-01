import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}

  async authentication(auth: AuthDto){
    const userEmail = await this.userService.findByUsername({username:auth.username});
    if(!userEmail) throw new BadRequestException('Usuario o contraseña incorrecto')
    const { id, password, ...rest } = userEmail;
    const payload = { sub: id };
    return {
      ...rest,
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser(username:string,password:string){
    const user = await this.userService.findByUsername({username});
    
    if(user && await compare(password,user.password)){
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
