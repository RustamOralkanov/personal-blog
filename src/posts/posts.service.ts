import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

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

    async findAll() {
        return this.prisma.post.findMany();
    }

    async findOne(id: number) {
        return this.prisma.post.findUnique({
            where: { id },
            include: { author: true },
        });
    }

    async updatePost(id: number, updatePostDto: UpdatePostDto) {
        return this.prisma.post.update({
            where: { id },
            data: updatePostDto,
        });
    }

    async deletePost(id: number) {
        return this.prisma.post.delete({
            where: { id },
        });
    }
}
