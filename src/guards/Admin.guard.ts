import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from "../admin/models/admin.model";
import { Role } from "../role/model/role.model";


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'Admin is not authorized' });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if(bearer != 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Admin is not authorized' });
    }
    
    async function verify(token: string, jwtService: JwtService) {
      const admin: Partial<Admin> = await jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

    if(!admin) {
      throw new UnauthorizedException({ message: 'Admin is not authorized' });
    }
        
    const active = await Admin.findOne({where:{id:admin.id}})
  
    if(!active.is_active) {
      throw new UnauthorizedException({ message: 'Admin is not active' });
    }

    const createadmin = admin.role_id
    const role = await Role.findOne({where:{id:createadmin}})
    if(role.name!="SuperAdmin" && role.name!="Admin"){
        throw new UnauthorizedException({ message: 'You are not a Admin or SuperAdmin' });
    }
    return true;
  }
  return verify(token, this.jwtService);
  }

  
}