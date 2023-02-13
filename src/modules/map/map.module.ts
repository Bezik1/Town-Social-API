import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { Coordinate, CoordinateSchema } from 'src/schemas/coordinate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coordinate.name, schema: CoordinateSchema }])
  ],
  controllers: [MapController],
  providers: [MapService]
})
export class MapModule {}
