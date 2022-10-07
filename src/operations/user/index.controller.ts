import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UserService } from './index.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUser() {
        return this.userService.getUser();
    }

    @Patch('/password')
    async updatePassword(@Req() req, @Body() body) {
        this.userService.updatePassword(req.$id, body.password);
    }
}
