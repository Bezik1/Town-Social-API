import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AnnouncmentInterface, CreateAnnouncmentDto } from 'src/interfaces/announcment.interface';
import { CoordinateInterface } from 'src/interfaces/coordinate.interface';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) {}

    @Post('create')
    public async addMap(@Body() createCoordinateDto: CoordinateInterface) {
        return await this.mapService.create(createCoordinateDto)
    }

    @Get('getAll')
    public async findUsers(@Req() req: { body: AnnouncmentInterface} ) {
        return await this.mapService.finAll()
    }

    @Get(':id')
    public async findUser(@Param('id') id: string) {
        return await this.mapService.findById(id)
    }

    @Put(':id')
    public async editUser(@Param('id') id: string, @Body() editCoordinateDto: CoordinateInterface) {
        return await this.mapService.editById(id, editCoordinateDto)
    }

    @Delete(':id')
    public async deleteUser(@Param('id') id: string) {
        return await this.mapService.deleteById(id)
    }
}
