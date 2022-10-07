import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { geo } from 'src/config/redis.config';

@Injectable()
export class DBRedisService {
    private client: any;

    constructor(private readonly redisService: RedisService) {
        this.getClient();
    }

    async getClient() {
        this.client = await this.redisService.getClient();
    }

    async needAddStart(key, lon, lat) {
        await this.client.geoadd(geo.nsid, lon, lat, key);
    }

    async needAddEnd(key, lon, lat) {
        await this.client.geoadd(geo.neid, lon, lat, key);
    }

    async canAddStart(key, lon, lat) {
        await this.client.geoadd(geo.csid, lon, lat, key);
    }

    async canAddEnd(key, lon, lat) {
        await this.client.geoadd(geo.ceid, lon, lat, key);
    }

    async reportAddStart(key, lon, lat) {
        await this.client.geoadd(geo.locale_sid, lon, lat, key);
    }

    async reportAddEnd(key, lon, lat) {
        await this.client.geoadd(geo.locale_eid, lon, lat, key);
    }

    async zrem(id, member) {
        id = geo[id];
        if (!id) {
            return;
        }

        await this.client.zrem(id, member);
    }

    async radiusbyMember(data) {
        const id = geo[data.id];
        if (!id) {
            return [];
        }

        if (!data.back) {
            data.back = geo.back;
        }

        try {
            let pos = await this.client.georadiusbymember(
                id,
                data.key,
                data.distance || geo.distance,
                geo.unit,
                data.back[0],
                data.back[1],
                data.sort || geo.sort,
            );

            if (!pos || !pos.length) {
                return [];
            }

            pos = pos
                .map((item) => {
                    return {
                        id: item[0],
                        distance: item[1],
                    };
                })
                .filter((item) => item.id);

            return pos;
        } catch (e) {
            return [];
        }
    }

    async radius(data) {
        const id = geo[data.id];
        if (!id) {
            return [];
        }

        if (!data.back) {
            data.back = geo.back;
        }

        try {
            let pos = await this.client.georadius(
                id,
                data.lon,
                data.lat,
                data.distance || geo.distance,
                geo.unit,
                data.back[0],
                data.back[1],
                data.sort || geo.sort,
            );

            if (!pos || !pos.length) {
                return [];
            }

            pos = pos
                .map((item) => {
                    return {
                        id: item[0],
                        distance: item[1],
                    };
                })
                .filter((item) => item.id);

            return pos;
        } catch (e) {
            return [];
        }
    }
}
