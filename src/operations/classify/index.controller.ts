import { SendBadRequest } from './../../utils/exception';
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ClassifyService } from './index.service';

@Controller('classify')
export class ClassifyController {
    constructor(private readonly classifyService: ClassifyService) {}

    @Get()
    getClassify(@Query() query, @Req() req) {
        const id = req.$id;
        return this.classifyService.getClassify(id, true);
    }

    @Post()
    addClassify(@Req() req, @Body() body) {
        const { name } = body;
        if (!name) {
            SendBadRequest('分类名称不能为空', 400);
        }

        return this.classifyService.addClassify(body.name, req.$id);
    }
}
