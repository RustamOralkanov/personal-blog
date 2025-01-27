import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return this.login(newUser); // После создания пользователя возвращаем токен
    }
}
