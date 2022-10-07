import { DBMerchantService } from './../../database/mongodb/merchant/index.service';
import { DBMerchantTokenService } from './../../database/mongodb/merchant_token/index.service';
import { SendBadRequest } from './../../utils/exception';
import { Injectable } from '@nestjs/common';
import ksUtil from '../../utils/ks';
import { DBSmsService } from 'src/database/mongodb/sms/index.service';
import { DBUserService } from 'src/database/mongodb/user/index.service';
import { DBAuthService } from 'src/database/mongodb/auth/index.service';
import { DBReputationService } from 'src/database/mongodb/reputation/index.service';
import { DBLocaleReportService } from 'src/database/mongodb/locale_report/index.service';
import { DBDeviceService } from 'src/database/mongodb/device/index.service';
import { DBWalletService } from 'src/database/mongodb/wallet/index.service';
import { DBWechatService } from 'src/database/mongodb/wechat/index.service';
import { DBAlipayService } from 'src/database/mongodb/alipay/index.service';
import { DBTokenService } from 'src/database/mongodb/token/index.service';
import { HttpService } from '@nestjs/axios';
import jpushConfig from 'src/config/jpush.config';
import { JpushBaseAuth } from 'src/utils/jpush';
import { defaultId } from 'src/config/user.config';
import { generateToken } from 'src/utils/token';
import { encryptPassword } from 'src/utils/validate';
import smsConfig from 'src/config/sms.config';

@Injectable()
export class SignService {
    constructor(
        private readonly dbSmsService: DBSmsService,
        private readonly dbUserService: DBUserService,
        private readonly dbAuthService: DBAuthService,
        private readonly dbReputationService: DBReputationService,
        private readonly dbLocaleReportService: DBLocaleReportService,
        private readonly dbDeviceService: DBDeviceService,
        private readonly dbBWalletService: DBWalletService,
        private readonly dbWechatService: DBWechatService,
        private readonly dbAlipayService: DBAlipayService,
        private readonly dbTokenService: DBTokenService,
        private readonly dbMerchantTokenService: DBMerchantTokenService,
        private readonly DBMerchantService: DBMerchantService,
        private readonly httpService: HttpService,
    ) {}

    async signInCode(phone): Promise<string> {
        return ksUtil.sendCode(phone);
    }

    async conditionUserCreateSchema(phone, code) {
        const user = await this.dbUserService.find({
            phone,
        });

        if (user) {
            this.createSignSmsData(phone, code, user.u_id);
            return;
        }

        this.createUserOtherSchema(phone, code);
    }

    async createUserOtherSchema(phone, code) {
        const userCount = await this.dbUserService.findUserCount();
        const u_id = defaultId + userCount;
        // 创建极光用户
        this.httpService
            .post(
                jpushConfig.addUrl,
                [
                    {
                        username: `${u_id}`,
                        nickname: `${u_id}`,
                        password: jpushConfig.password,
                    },
                ],
                JpushBaseAuth(),
            )
            .subscribe((res) => console.log('创建极光用户 => ', res.data));
        const auth = await this.dbAuthService.create({ u_id });
        const reputation = await this.dbReputationService.create({ u_id });
        const localeReport = await this.dbLocaleReportService.create({
            u_id,
        });
        const device = await this.dbDeviceService.create({ u_id });
        const wallet = await this.dbBWalletService.create({ u_id });
        const wechat = await this.dbWechatService.create({ u_id });
        const alipay = await this.dbAlipayService.create({ u_id });

        await this.dbUserService.create({
            u_id,
            phone,
            auth: auth._id,
            reputation: reputation._id,
            report: localeReport._id,
            device: device._id,
            wallet: wallet._id,
            wechat: wechat._id,
            alipay: alipay._id,
        });

        this.createSignSmsData(phone, code, u_id);
    }

    async createSignSmsData(phone, code, u_id?) {
        const sms = await this.dbSmsService.find({
            phone,
            type: 'sign',
        });

        if (sms) {
            await this.dbSmsService.update({
                phone,
                type: 'sign',
                code,
            });

            return;
        }

        await this.dbSmsService.create({
            u_id,
            phone,
            type: 'sign',
            code,
        });
    }

    async sendSmsCodeReuqest(Mobile, code) {
        await this.httpService
            .get(smsConfig.url, {
                params: {
                    Mobile,
                    Content: `【爱郊圈】您的验证码是：${code}，5分钟内有效！`,
                },
            })
            .toPromise();
    }

    async verify(body): Promise<string> {
        const { phone, code } = body;
        const sms = await this.dbSmsService.find({
            phone,
            type: 'sign',
            code,
        });

        if (!sms) {
            SendBadRequest('验证码不正确');
        }

        const user = await this.dbUserService.find({
            phone,
        });

        if (!user) {
            SendBadRequest('登录失败');
        }

        await this.dbUserService.updateStatus({
            u_id: user.u_id,
            status: 1,
        });

        return this.setUserToken(user);
    }

    async setUserToken(user): Promise<string> {
        let token: any;

        const data = {
            token: generateToken(user),
        };

        if (user.u_id) {
            token = await this.dbTokenService.find({
                u_id: user.u_id,
            });
            data['u_id'] = user.u_id;

            if (!token) {
                await this.dbTokenService.create(data);
            } else {
                await this.dbTokenService.update(data);
            }
        } else {
            token = await this.dbMerchantTokenService.find({
                m_id: user.m_id,
            });
            data['m_id'] = user.m_id;

            if (!token) {
                await this.dbMerchantTokenService.create(data);
            } else {
                await this.dbMerchantTokenService.update(data);
            }
        }

        return data.token;
    }

    async signInPass(body): Promise<string> {
        const { phone, password, merchant } = body;

        let user: any;

        if (!merchant) {
            user = await this.dbUserService.find({
                phone,
                password: encryptPassword(password),
            });
        } else {
            user = await this.DBMerchantService.find({
                phone,
                status: 2,
                password: encryptPassword(password),
            });
        }

        if (!user) {
            if (!merchant) {
                return SendBadRequest('账号密码错误', 400);
            }

            return SendBadRequest('商家正在审核', 400);
        }

        return this.setUserToken(user);
    }
}
