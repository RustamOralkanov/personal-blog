import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [
        JwtModule.register({
            secret: "yourSecretKey", // Задай секретный ключ
            signOptions: { expiresIn: "1h" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
})
export class AuthModule {}
