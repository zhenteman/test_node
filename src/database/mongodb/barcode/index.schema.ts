import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import OptionsSchema from '../schemas/options.schema';

export type BarcodeDocument = Barcode & Document;

@Schema(OptionsSchema)
export class Barcode extends Document {
    // 条形码
    @Prop({
        unique: true,
        required: true,
    })
    code: string;

    // 商品名称
    @Prop()
    goodsName: string;

    // 厂商
    @Prop()
    manuName: string;

    // 规格
    @Prop()
    spec: string;

    @Prop()
    // 参考价格(单位:元)
    price: string;

    @Prop()
    // 商标/品牌名称
    trademark: string;

    // 图片地址
    @Prop()
    img: string;

    @Prop()
    // 商品分类
    goodsType: string;

    @Prop()
    // 条码图片
    sptmImg: string;

    @Prop()
    // 原产地(可能无此参数信息)
    ycg: string;

    @Prop()
    // 备注信息
    note: string;

    @Prop()
    // 厂商地址
    manuAddress: string;

    // 条码中心图片列表
    @Prop()
    imgList: [];

    // gpc分类代码
    @Prop()
    gpc: string;

    // gpc分类名称
    @Prop()
    gpcType: string;

    @Prop()
    // 关键词
    keyword: string;

    @Prop()
    // 生产许可证号
    qs: string;

    @Prop()
    // 宽
    width: string;

    // 高
    @Prop()
    hight: string;

    // 深
    @Prop()
    depth: string;

    // 毛重
    @Prop()
    gw: string;

    // 净重
    @Prop()
    nw: string;

    // 形态描述
    @Prop()
    description: string;

    @Prop({
        default: Date.now,
    })
    created_time: Date;

    @Prop({
        default: Date.now,
    })
    updated_time: Date;
}

export const SchemaName = 'barcode';
export const BarcodeSchema = SchemaFactory.createForClass(Barcode);
