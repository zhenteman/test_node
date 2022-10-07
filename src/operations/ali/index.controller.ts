import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AliService } from './index.service';

@Controller('ali')
export class AliController {
    constructor(private readonly aliService: AliService) {}

    @Get('infostr')
    async getInfoStr(@Req() req) {
        return this.aliService.getInfoStr(req.$user);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Body() body, @Req() req) {
        return this.aliService.uploadOss(file, body.dir, req.$user.id);
    }

    @Post('notify')
    async notify(@Body() body) {
        return this.aliService.notify(body);
    }
}
