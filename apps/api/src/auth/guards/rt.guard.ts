import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class RtGuard implements CanActivate {
    constructor(private jwt : JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()   
        const token = this.extractTokenFromHeader(request)
        
        if(!token) throw new UnauthorizedException()

        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret : process.env.jwtRefreshTokenKey
            })

            request['user'] = payload
        }
        catch{
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(req : Request){
        const [type, token] = req.headers.authorization?.split(' ') ?? []
        return type === "Refresh" ? token : undefined
    }
}