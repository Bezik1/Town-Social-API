import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash, compareSync } from 'bcrypt'
import { Response } from 'src/interfaces/response.interface';
import { CreateUserDto, UserInterface } from 'src/interfaces/user.interface';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Role } from 'src/constans';
import { UserLogin } from 'src/interfaces/userLogin.class';
import { writeFileSync } from 'fs';
import { readFile } from 'fs/promises';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    //@ts-ignore
    public async addPhoto(file: Express.Multer.File) {
        try {
            const filePath = `uploads/${new Date().getTime()}-${file.originalname}`
            writeFileSync(filePath, file.buffer)

            return {
                status: 'succes',
                message: 'File uploaded succesfully',
                data: filePath
            }
        } catch(err) {
            throw new InternalServerErrorException({
                status: 'error',
                message: `File uploading error: ${err.message}`,
            })
        }
    }

    public async getPhoto(username: string) {
        try {
            const user = await this.userModel.findOne({ username }).exec()
            const buffer = await readFile(user.picturePath)
            const data = buffer.toString('base64')

            return {
                status: 'succes',
                message: 'File got succesfully',
                data
            } 
        } catch(err) {
            return {
                status: 'error',
                message: `File getting error: ${err.message}`,
            } 
        }
    }



    public async create(createUserDto: CreateUserDto): Promise<Response<User>> {
        try {
            const { username, email, password, loggined } = createUserDto

            const salt = +process.env.SALT
            const hashedPassword = await hash(password, salt)

            const data = new this.userModel<UserInterface>({
                username,
                loggined: loggined,
                email,
                roles: [Role.User],
                picturePath: '',
                password: hashedPassword,
            })
            
            return {
                status: 'succes',
                message: 'User saved succesfully',
                data: await data.save()
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User saving error: ${err.message}`,
            } 
        }
    }

    public async finAll(): Promise<Response<User[]>> {
        try {
            const data = await this.userModel.find()

            return {
                status: 'succes',
                message: 'Users got succesfully',
                data 
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Users getting error: ${err.message}`,
            } 
        }
    }

    public async findById(_id: string): Promise<Response<User>> {
        try {
            const data = await this.userModel.findOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'User got succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User getting error: ${err.message}`
            }
        }
    }

    public async changePhoto(_id: string, picturePath: string) {
        try {
            const user = await this.userModel.findOne({ _id }).exec()

            const data = await user.updateOne({ picturePath })

            return {
                status:'succes',
                message: 'Photo changed succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `Photo changing error: ${err.message}`
            }
        }
    }

    public async editById(_id: string, editUserDto: UserInterface): Promise<Response<User>> {
        try {
            const user = await this.userModel.findOne({ _id }).exec()
            const { username, email, roles, password, loggined, picturePath } = editUserDto

            const salt = await genSalt(+process.env.SALT_ROUNDS)
            const hashedPassword = await hash(password, salt)

            const data = await user.update({
                    username,
                    email,
                    loggined,
                    picturePath,
                    roles,
                    password: hashedPassword,
                })

            return {
                status:'succes',
                message: 'User edited succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User editing error: ${err.message}`
            }
        }
    }

    public async deleteById(_id: string): Promise<Response<User>> {
        try {
            await this.userModel.deleteOne({ _id }).exec()

            return {
                status: 'succes',
                message: 'User deleted succesfully',
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User deleting error ${err.message}`
            }
        }
    }

    public async changeRole(rolesReq: { _id: string, roles: Role[] }): Promise<Response<User>> {
        try {
            const { _id, roles } = rolesReq
            const user = await this.userModel.findOne({ _id }).exec()
            const { username, password, email } = user

            const data = await user.update({
                username,
                email,
                roles,
                password,
            })

            return {
                status: 'succes',
                message: 'User roles modified succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User roles modified error ${err.message}`,
            }
        }
    }

    public async ifLoggined(device: string) {
        try {
            const users = await this.userModel.find().exec()
    
            const ifLDevice = users.some(user => user.loggined.device === device && user.loggined.status)

            if(ifLDevice) {
                return {
                    status: 'succes',
                    message: `User got succesfully`,
                    data:  await this.userModel.findOne({ loggined: { device: device, status: true } }).exec()
                }
            } else {
                return {
                    status: 'error',
                    message: `User getting error`,
                }
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User getting error: ${err.message}`,
            }
        }
    }

    public async logout(_id: string) {
        try {
            const data = await this.userModel.findOneAndUpdate<User>(
                { _id }, 
                { $set: { "loggined": { "device": "", "status": false } } }
            )

            return { 
                status: 'succes', 
                message: 'User logged out succesfully',
                data
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User getting error: ${err.message}`
            }
        }
    }

    public async login({ email, password, device } : UserLogin) {
        try {
            const fetchedUser = await this.userModel.findOne({ email })

            const ifPassword = compareSync(password, fetchedUser.password)
            const ifEmail =  email === fetchedUser.email ? true : false

            switch(true){
                case (ifPassword === false):
                    return { status: 'error', message: 'Incorrect password'}
                case (ifEmail === false):
                    return { status: 'error', message: 'Incorrect email'}
                case (ifPassword && ifEmail):
                    const data = await this.userModel.findOneAndUpdate<User>(
                        { _id: fetchedUser._id  }, 
                        { $set: { "loggined": { "device": device, "status": true } } }
                    )
                    
                    return { status: 'succes', message: 'User loggined succesfully', data}
                default:
                    return { status: 'error', message: 'Logging error'}
            }
        } catch(err) {
            return {
                status: 'error',
                message: `User logging error: ${err.message}`
            }
        }
    }
}
