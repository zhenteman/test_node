import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { DBRedisService } from 'src/database/redis/index/index.service';
import { preSendJpush } from 'src/utils/jpush';
import format from 'src/utils/time-format';

@Processor('site')
export class SiteProcessor {
    constructor(private readonly dbRedisService: DBRedisService) {}

    @Process('report')
    async report(job: Job) {
        const { u_id, start } = job.data;

        await this.dbRedisService.reportAddStart(u_id, start.lon, start.lat);
    }

    @Process('nofity')
    async nofity(job: Job) {
        preSendJpush(
            {
                builder_id: 2,
                alertTYpe: 2,
                alert: job.data.alert,
                title: job.data.title,
                priority: 2,
                style: 2,
                extras: {},
            },
            [job.data.id],
        );
    }
}
