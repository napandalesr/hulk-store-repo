import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ){
    super({
      usernameField: 'username',
      passwordField: 'password'
    })
  }

  async validate(username:string, password:string){
    const user = await this.authService.validateUser(username,password);
    
    if(!user) throw new UnauthorizedException('Usuario o contraseña incorrecto');
    return user;
  }
}