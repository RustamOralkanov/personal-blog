import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() body: { email: string; password: string }) {
        if (!body) {
            throw new HttpException({ message: "Email and password are required" }, 400);
        }

        const { email, password } = body;

        if (!email || !password) {
            throw new HttpException({ message: "Email and password are required" }, 400);
        }

        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        return this.authService.login(user);
    }

    @Post("register")
    async register(@Body() body: { email: string; password: string }) {
        // Проверка наличия данных
        if (!body || !body.email || !body.password) {
            throw new HttpException({ message: "Email and password are required" }, 400);
        }

        const { email, password } = body;
        return this.authService.register(email, password);
    }
}
