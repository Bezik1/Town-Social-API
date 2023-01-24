import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnnouncmentInterface, CreateAnnouncmentDto } from 'src/interfaces/announcment.interface';
import { Comment, CreateCommentDto } from 'src/interfaces/comment.interface';
import { Response } from 'src/interfaces/response.interface';
import { Announcment, AnnouncmentDocument } from 'src/schemas/announcment.schema';

@Injectable()
export class AnnouncmentsService {
    constructor(@InjectModel(Announcment.name) private announcmentModel: Model<AnnouncmentDocument>) {}

    async create(createAnnouncmentDto: CreateAnnouncmentDto): Promise<Response<AnnouncmentInterface>> {
        try {
            const { author, content, rang, date } = createAnnouncmentDto

            const data = new this.announcmentModel<AnnouncmentInterface>({
                author,
                content,
                date,
                rang,
                comments: [],
                likes: []
            })
            
            return {
                status: 'succes',
                message: 'Announcment saved succesfully',
                data: await data.save()
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcment saving error: ${err.message}`,
            } 
        }
    }

    async finAll(): Promise<Response<AnnouncmentInterface[]>> {
        try {
            const data = await this.announcmentModel.find()

            return {
                status: 'succes',
                message: 'Announcment got succesfully',
                data 
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcments getting error: ${err.message}`,
            } 
        }
    }

    async findById(_id: string): Promise<Response<AnnouncmentInterface>> {
        try {
            const data = await this.announcmentModel.findOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'Announcment got succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcment getting error: ${err.message}`
            }
        }
    }

    async like(_id: string, username: string): Promise<Response<AnnouncmentInterface>> {
        try {
            const announcment = await this.announcmentModel.findOne({ _id }).exec()

            const data = await announcment.updateOne({
                likes: [...announcment.likes, username]
            })

            return {
                status:'succes',
                message: 'Announcment edited succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcment editng error: ${err.message}`
            }
        }
    }

    async disLike(_id: string, username: string): Promise<Response<AnnouncmentInterface>> {
        try {
            const announcment = await this.announcmentModel.findOne({ _id }).exec()

            const data = await announcment.updateOne({
                likes: announcment.likes.filter(like => like !== username)
            })

            return {
                status:'succes',
                message: 'Announcment edited succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcment editng error: ${err.message}`
            }
        }
    }

    async removeComment(_id: string, removeComment: CreateCommentDto): Promise<Response<AnnouncmentInterface>> {
        try {
            const { author, content } = removeComment
            const announcment = await this.announcmentModel.findOne({ _id }).exec()

            const data = await announcment.updateOne({
                comments: announcment.comments.filter(comment => comment.content !== content || comment.author !== author)
            })

            return {
                status:'succes',
                message: 'Comment removing succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Comment removing error: ${err.message}`
            }
        }
    }

    async addComment(_id: string, comment: CreateCommentDto): Promise<Response<AnnouncmentInterface>> {
        try {
            const announcment = await this.announcmentModel.findOne({ _id }).exec()

            const newComment: Comment = {
                ...comment,
                likes: []
            }

            const data = await announcment.updateOne({
                comments: [...announcment.comments, newComment]
            })

            return {
                status:'succes',
                message: 'Comment added succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Comment adding error: ${err.message}`
            }
        }
    }

    async editById(_id: string, editUserDto: CreateAnnouncmentDto): Promise<Response<AnnouncmentInterface>> {
        try {
            const user = await this.announcmentModel.findOne({ _id }).exec()
            const { author, content, rang, date } = editUserDto

            const data = await user.update({
                    author,
                    content,
                    rang,
                    date,
                })

            return {
                status:'succes',
                message: 'Announcment edited succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcment editing error: ${err.message}`
            }
        }
    }

    async deleteById(_id: string): Promise<Response<AnnouncmentInterface>> {
        try {
            await this.announcmentModel.deleteOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'Announcment deleted succesfully',
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Announcment deleting error ${err.message}`
            }
        }
    }
}
