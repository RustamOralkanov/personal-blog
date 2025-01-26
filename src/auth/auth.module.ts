import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "yourSecretKey",
            signOptions: { expiresIn: "1h" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
