import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AnnouncmentInterface, CreateAnnouncmentDto } from 'src/interfaces/announcment.interface';
import { Comment, CreateCommentDto } from 'src/interfaces/comment.interface';
import { AnnouncmentsService } from './announcments.service';

@Controller('announcments')
export class AnnouncmentsController {
    constructor(private readonly announcmentsService: AnnouncmentsService) {}

    @Post('create')
    public async createUser(@Body() createUserDto: CreateAnnouncmentDto) {
        return await this.announcmentsService.create(createUserDto)
    }

    @Post('like/:id')
    public async like(@Param('id') _id: string, @Body() { username } : { username: string }) {
        return await this.announcmentsService.like(_id, username)
    }

    @Post('disLike/:id')
    public async disLike(@Param('id') _id: string, @Body() { username } : { username: string }) {
        return await this.announcmentsService.disLike(_id, username)
    }

    @Post('disLikeComment')
    public async disLikeComment(@Body() body: { _id: string, index: number, username: string }) {
        return await this.announcmentsService.disLikeComment(body)
    }

    @Post('likeComment')
    public async likeComment(@Body() body: { _id: string, index: number, username: string }) {
        return await this.announcmentsService.likeComment(body)
    }

    @Post('addComment/:id')
    public async addComment(@Param('id') _id: string, @Body() comment: CreateCommentDto) {
        return await this.announcmentsService.addComment(_id, comment)
    }

    @Post('removeComment/:id')
    public async removeComment(@Param('id') _id: string, @Body() comment: CreateCommentDto) {
        return await this.announcmentsService.removeComment(_id, comment)
    }

    @Get('get')
    public async findUsers(@Req() req: { body: AnnouncmentInterface} ) {
        return await this.announcmentsService.finAll()
    }

    @Get(':id')
    public async findUser(@Param('id') id: string) {
        return await this.announcmentsService.findById(id)
    }

    @Put(':id')
    public async editUser(@Param('id') id: string, @Body() editUserDto: AnnouncmentInterface) {
        return await this.announcmentsService.editById(id, editUserDto)
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string) {
        return await this.announcmentsService.deleteById(id)
    }
}
