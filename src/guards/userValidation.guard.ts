import {
    Injectable,
    NestMiddleware,
    BadRequestException,
  } from '@nestjs/common';
  import { validate } from 'class-validator';
  import { UserInterface } from 'src/interfaces/user.interface';
  
  @Injectable()
  export class UserValidationGuard implements NestMiddleware {
    async use(req: any) {
      const user = new UserInterface();
      user.email = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;
      
      const validationError = await validate(user)

      if(validationError.length > 0) throw new BadRequestException('User validation error')
    }
  }