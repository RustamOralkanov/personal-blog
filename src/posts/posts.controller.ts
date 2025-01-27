import { Body, Controller, Post, Get, Request, Response, UseGuards, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { Response as ResponseProps } from "express";

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto, @Request() req: { user: { userId: number } }, @Response() res: ResponseProps) {
        const newPost = this.postsService.create(createPostDto, req.user.userId);
        res.status(200).send({ message: "Post created" });

        return newPost;
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.postsService.findOne(+id);
    }
}
