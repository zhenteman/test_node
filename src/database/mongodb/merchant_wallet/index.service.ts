import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MerchantWallet, MerchantWalletDocument } from './index.schema';
import { CreateWallet, FindWallet, UpdateWallet } from './index.dto';

@Injectable()
export class DBMerchantWalletService {
    constructor(
        @InjectModel('merchant_wallet')
        private walletModel: Model<MerchantWalletDocument>,
    ) {}

    // 创建钱包
    async create(createWallet: CreateWallet): Promise<MerchantWallet> {
        const created = new this.walletModel(createWallet);

        return created.save();
    }

    // 查询钱包
    async find(data: FindWallet): Promise<MerchantWallet> {
        return this.walletModel.findOne(data);
    }

    // 更新钱包
    async update(data: UpdateWallet): Promise<MerchantWallet> {
        const update = {};

        if (data.balance) {
            update['balance'] = data.balance;
        }

        if (data.status) {
            update['status'] = data.status;
        }

        return this.walletModel.findOneAndUpdate(
            {
                m_id: data.m_id,
            },
            {
                $set: update,
            },
            {
                new: true,
            },
        );
    }
}
