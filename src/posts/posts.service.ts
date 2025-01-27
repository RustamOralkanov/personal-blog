import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto, userId: number) {
        return this.prisma.post.create({
            data: {
                ...createPostDto,
                authorId: userId,
            },
        });
    }
}
