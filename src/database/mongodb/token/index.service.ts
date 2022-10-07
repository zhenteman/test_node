import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './index.schema';
import { CreateToken, UpdateToken } from './index.dto';

@Injectable()
export class DBTokenService {
    constructor(
        @InjectModel('token') private tokenModel: Model<TokenDocument>,
    ) {}

    // 创建token
    async create(createToken: CreateToken): Promise<Token> {
        const created = new this.tokenModel(createToken);
        return created.save();
    }

    // 查找token
    async find(data: UpdateToken): Promise<Token> {
        return this.tokenModel.findOne(data);
    }

    // 更新token
    async update(data: UpdateToken): Promise<Token> {
        return this.tokenModel.findOneAndUpdate(
            {
                u_id: data.u_id,
            },
            {
                $set: data,
            },
            {
                new: true,
            },
        );
    }
}
