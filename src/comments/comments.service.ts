import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) {}

    async createComment(createCommentDto: CreateCommentDto, userId: number) {
        return this.prisma.comment.create({
            data: {
                content: createCommentDto.content,
                postId: createCommentDto.postId,
                authorId: userId,
            },
        });
    }
}
