import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "yourSecretKey", // Тот же ключ, что в JwtModule
        });
    }

    validate(payload: { sub: string; email: string }) {
        console.log("JWT Payload:", payload);
        return { userId: payload.sub, email: payload.email };
    }
}
