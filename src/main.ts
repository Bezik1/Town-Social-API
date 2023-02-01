import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common/pipes';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import helmet from 'helmet';

const bootstrap = async () =>{
  //openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem  
  const privateKey = readFileSync('./cert/key.pem')
  const certificate = readFileSync('./cert/certificate.pem')

  const httpsOptions: HttpsOptions = {
    key: privateKey,
    cert: certificate
  }
  

  const app = await NestFactory.create(
    AppModule,
    //Security settings
    //{httpsOptions}
  )

  //Security barriers
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
    }),
  )
  app.enableCors();
  app.use(helmet())

  await app.listen(process.env.PORT || 3000);
}
bootstrap();