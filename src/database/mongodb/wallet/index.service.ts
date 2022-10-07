import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from './index.schema';
import { CreateWallet, FindWallet, UpdateWallet } from './index.dto';

@Injectable()
export class DBWalletService {
    constructor(
        @InjectModel('wallet')
        private walletModel: Model<WalletDocument>,
    ) {}

    // 创建钱包
    async create(createWallet: CreateWallet): Promise<Wallet> {
        const created = new this.walletModel(createWallet);

        return created.save();
    }

    // 查询钱包
    async find(data: FindWallet): Promise<Wallet> {
        return this.walletModel.findOne(data);
    }

    // 更新钱包
    async update(data: UpdateWallet): Promise<Wallet> {
        const update = {};

        if (data.balance) {
            update['balance'] = data.balance;
        }

        if (data.status) {
            update['status'] = data.status;
        }

        return this.walletModel.findOneAndUpdate(
            {
                u_id: data.u_id,
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
