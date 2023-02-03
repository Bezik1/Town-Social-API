import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from "@nestjs/throttler"
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AnnouncmentsController } from './modules/announcments/announcments.controller';
import { AnnouncmentsModule } from './modules/announcments/announcments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.API_LINK),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UsersModule,
    AnnouncmentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
  }],
})
export class AppModule {}
