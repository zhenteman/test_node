import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocaleReport, LocaleReportDocument } from './index.schema';
import {
    CreateLocaleReport,
    FindLocaleReport,
    AddLocalReport,
} from './index.dto';

@Injectable()
export class DBLocaleReportService {
    constructor(
        @InjectModel('locale_report')
        private localeReportModel: Model<LocaleReportDocument>,
    ) {}

    // 创建坐标
    async create(
        createLocaleReport: CreateLocaleReport,
    ): Promise<LocaleReport> {
        const created = new this.localeReportModel(createLocaleReport);

        return created.save();
    }

    // 查询坐标
    async find(data: FindLocaleReport): Promise<LocaleReport> {
        return this.localeReportModel.findOne(data);
    }

    // 新增地点上报
    async add(data: AddLocalReport): Promise<LocaleReport> {
        return this.localeReportModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $push: {
                    reports: data,
                },
            },
            {
                new: true,
            },
        );
    }
}
