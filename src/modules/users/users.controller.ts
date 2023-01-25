import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateUserDto, UserInterface } from 'src/interfaces/user.interface';
import { UsersService } from './users.service';
import { Role } from 'src/constans';
import { Roles } from 'src/decorators/roles.decorator';
import { UserLogin } from 'src/interfaces/userLogin.class';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserValidationGuard } from 'src/guards/userValidation.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('create')
    @UseGuards(UserValidationGuard)
    public async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto)
    }

    @Post('addPhoto')
    @UseInterceptors(FileInterceptor('photo'))
    //@ts-ignore
    async updateFile(@UploadedFile() file: Express.Multer.File) {
        return this.userService.addPhoto(file)
    }

    @Get('getPhoto/:username')
    public async getPhoto(@Param('username') username: string) {
        return this.userService.getPhoto(username)
    }

    @Post('changePhoto/:id')
    public async changePhoto(@Param('id') _id: string, @Body() path: { path: string } ) {
        return await this.userService.changePhoto(_id, path.path)
    }

    @Post('get')
    @UseGuards(UserValidationGuard)
    @Roles(Role.Admin)
    public async findUsers(@Req() req: { body: UserInterface} ) {
        return await this.userService.finAll()
    }

    @Get(':id')
    @Roles(Role.Admin)
    public async findUser(@Param('id') id: string) {
        return await this.userService.findById(id)
    }

    @Put(':id')
    @Roles(Role.Admin)
    public async editUser(@Param('id') id: string, @Body() editUserDto: UserInterface) {
        return await this.userService.editById(id, editUserDto)
    }

    @Delete(':id')
    @Roles(Role.Admin)
    public async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteById(id)
    }

    @Post('login')
    public async login(@Body() user: UserLogin) {
        return this.userService.login(user)
    }

    @Post('changeRole')
    @Roles(Role.Admin)
    public async changeRole(@Body() roleReq: { _id: string, roles: Role[] }) {
        return this.userService.changeRole(roleReq)
    }
}