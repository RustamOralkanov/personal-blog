import { Body, Controller, Post, Get, Patch, Delete, Request, Response, UseGuards, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { Response as ResponseProps } from "express";
import { UpdatePostDto } from "./dto/update-post.dto";

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

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto, @Response() res: ResponseProps) {
        res.status(200).send({ message: "Post updated" });
        return this.postsService.updatePost(+id, updatePostDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param("id") id: string, @Response() res: ResponseProps) {
        res.status(200).send({ message: "Post deleted" });
        return this.postsService.deletePost(+id);
    }
}
