import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CURRENT_USER_KEY } from "utils/constants";
import { JwtPayloadType } from "utils/types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ){}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const [type , token] = request.headers.authorization?.split(' ') ?? [] ;

    if (!token || type === 'Bearer') {
      try {
        const payload : JwtPayloadType = await this.jwtService.verifyAsync(token , {
          secret: this.configService.get<string>('JWT_SECRET'),
        })
        request[CURRENT_USER_KEY] = payload;
      } catch {
        throw new UnauthorizedException("access token denied , invalid token");
      }
    }else {
        throw new UnauthorizedException("access token denied , no token provided");
    }
    return true;
}
}