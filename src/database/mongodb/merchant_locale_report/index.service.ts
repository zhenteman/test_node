import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    MerchantLocaleReport,
    MerchantLocaleReportDocument,
} from './index.schema';
import {
    CreateLocaleReport,
    FindLocaleReport,
    AddLocalReport,
} from './index.dto';

@Injectable()
export class DBMerchantLocaleReportService {
    constructor(
        @InjectModel('merchant_locale_report')
        private localeReportModel: Model<MerchantLocaleReportDocument>,
    ) {}

    // 创建坐标
    async create(
        createLocaleReport: CreateLocaleReport,
    ): Promise<MerchantLocaleReport> {
        const created = new this.localeReportModel(createLocaleReport);

        return created.save();
    }

    // 查询坐标
    async find(data: FindLocaleReport): Promise<MerchantLocaleReport> {
        return this.localeReportModel.findOne(data);
    }

    // 新增地点上报
    async add(data: AddLocalReport): Promise<MerchantLocaleReport> {
        return this.localeReportModel.findOneAndUpdate(
            {
                m_id: data.m_id,
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
