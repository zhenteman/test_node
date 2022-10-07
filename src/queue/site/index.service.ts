import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class SiteQueueService {
    constructor(@InjectQueue('site') private siteQueue: Queue) {}

    add(data) {
        this.siteQueue.add('nofity', data);
    }
}
