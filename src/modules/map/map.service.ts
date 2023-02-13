import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoordinateInterface } from 'src/interfaces/coordinate.interface';
import { Comment, CreateCommentDto } from 'src/interfaces/comment.interface';
import { Response } from 'src/interfaces/response.interface';
import { Coordinate, CoordinatetDocument } from 'src/schemas/coordinate.schema';

@Injectable()
export class MapService {
    constructor(@InjectModel(Coordinate.name) private coordinateModel: Model<CoordinatetDocument>) {}

    async create(createCoordinate: CoordinateInterface): Promise<Response<CoordinateInterface>> {
        try {
            const { latitude, longitude, description, role, author, title } = createCoordinate

            const data = new this.coordinateModel<CoordinateInterface>({
                author, 
                title,
                latitude, 
                longitude,
                description,
                role,
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

    async finAll(): Promise<Response<CoordinateInterface[]>> {
        try {
            const data = await this.coordinateModel.find()

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

    async findById(_id: string): Promise<Response<CoordinateInterface>> {
        try {
            const data = await this.coordinateModel.findOne({ _id }).exec()

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

    async editById(_id: string, editUserDto: CoordinateInterface): Promise<Response<CoordinateInterface>> {
        try {
            const user = await this.coordinateModel.findOne({ _id }).exec()
            const { longitude, latitude, description, role, author, title } = editUserDto

            const data = await user.update({
                author,
                longitude,
                latitude,
                title,
                description,
                role,
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

    async deleteById(_id: string): Promise<Response<CoordinateInterface>> {
        try {
            await this.coordinateModel.deleteOne({ _id }).exec()

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
