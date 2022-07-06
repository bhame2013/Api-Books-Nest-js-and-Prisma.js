import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './modules/auth/decorators/current-user.decorator';
import { User } from './modules/user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/me')
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }
}
