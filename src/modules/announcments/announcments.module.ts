import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Announcment, AnnouncmentSchema } from 'src/schemas/announcment.schema';
import { AnnouncmentsController } from './announcments.controller';
import { AnnouncmentsService } from './announcments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Announcment.name, schema: AnnouncmentSchema }])
  ],
  controllers: [AnnouncmentsController],
  providers: [AnnouncmentsService]
})
export class AnnouncmentsModule {}
