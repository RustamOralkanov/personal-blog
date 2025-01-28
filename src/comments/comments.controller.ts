import { Controller, Body, Post, UseGuards, Request, Response } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Response as ResponseProps } from "express";

@Controller("comments")
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createComment(@Body() createCommentDto: CreateCommentDto, @Request() req: { user: { userId: number } }, @Response() res: ResponseProps) {
        console.log(createCommentDto);
        console.log(req.user.userId);
        res.status(200).send({ message: "Comment created" });
        return this.commentsService.createComment(createCommentDto, req.user.userId);
    }
}
