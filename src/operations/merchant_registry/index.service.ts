import { DBMerchantService } from '../../database/mongodb/merchant/index.service';
import { SendBadRequest } from '../../utils/exception';
import { Injectable } from '@nestjs/common';
import ksUtil from '../../utils/ks';
import { HttpService } from '@nestjs/axios';
import jpushConfig from 'src/config/jpush.config';
import { JpushBaseAuth } from 'src/utils/jpush';
import { defaultId } from 'src/config/user.config';
import { encryptPassword } from 'src/utils/validate';
import { DBMerchantSmsService } from 'src/database/mongodb/merchant_sms/index.service';
import { DBMerchantAuthService } from 'src/database/mongodb/merchant_auth/index.service';
import { DBMerchantDeviceService } from 'src/database/mongodb/merchant_device/index.service';
import { DBMerchantLocaleReportService } from 'src/database/mongodb/merchant_locale_report/index.service';
import { DBMerchantReputationService } from 'src/database/mongodb/merchant_reputation/index.service';
import { DBMerchantWalletService } from 'src/database/mongodb/merchant_wallet/index.service';
import { DBMerchantWechatService } from 'src/database/mongodb/merchant_wechat/index.service';
import { DBMerchantAlipayService } from 'src/database/mongodb/merchant_alipay/index.service';
import { DBMerchantCertificationService } from 'src/database/mongodb/merchant_certification/index.service';
import { DBMerchantPromotionService } from 'src/database/mongodb/merchant_promotion/index.service';
import smsConfig from 'src/config/sms.config';

@Injectable()
export class MerchantRegistryService {
    constructor(
        private readonly httpService: HttpService,
        private readonly dbMerchantService: DBMerchantService,
        private readonly dbMerchantSmsService: DBMerchantSmsService,
        private readonly dbMerchantAuthService: DBMerchantAuthService,
        private readonly dbMerchantDeviceService: DBMerchantDeviceService,
        private readonly dbMerchantLocaleReportService: DBMerchantLocaleReportService,
        private readonly dbMerchantReputationService: DBMerchantReputationService,
        private readonly dbMerchantWalletService: DBMerchantWalletService,
        private readonly dbMerchantWechatService: DBMerchantWechatService,
        private readonly dbMerchantAlipayService: DBMerchantAlipayService,
        private readonly dbMerchantCertificationService: DBMerchantCertificationService,
        private readonly dbMerchantPromotionService: DBMerchantPromotionService,
    ) {}

    async signInCode(phone): Promise<string> {
        return ksUtil.sendCode(phone);
    }

    async conditionUserCreateSchema(phone, code) {
        const user = await this.dbMerchantService.find({
            phone,
            status: 0,
        });

        if (user) {
            this.createSignSmsData(phone, code, user.m_id);
            return;
        }

        this.createUserOtherSchema(phone, code);
    }

    async sendSmsCodeReuqest(Mobile, code) {
        await this.httpService
            .get(smsConfig.url, {
                params: {
                    Mobile,
                    Content: `【爱郊圈】商家入驻申请，您的验证码是：${code}，5分钟内有效！`,
                },
            })
            .toPromise();
    }

    async createUserOtherSchema(phone, code) {
        const userCount = await this.dbMerchantService.findUserCount();
        const m_id = 'm' + defaultId + userCount;

        // 创建极光用户
        this.httpService
            .post(
                jpushConfig.addUrl,
                [
                    {
                        username: `${m_id}`,
                        nickname: `${m_id}`,
                        password: jpushConfig.password,
                    },
                ],
                JpushBaseAuth(),
            )
            .subscribe((res) => console.log('创建极光用户 => ', res.data));

        const auth = await this.dbMerchantAuthService.create({ m_id });
        const reputation = await this.dbMerchantReputationService.create({
            m_id,
        });
        const localeReport = await this.dbMerchantLocaleReportService.create({
            m_id,
        });
        const device = await this.dbMerchantDeviceService.create({ m_id });
        const wallet = await this.dbMerchantWalletService.create({ m_id });
        const wechat = await this.dbMerchantWechatService.create({ m_id });
        const alipay = await this.dbMerchantAlipayService.create({ m_id });
        const promotion = await this.dbMerchantPromotionService.create({
            m_id,
        });
        const certification = await this.dbMerchantCertificationService.create({
            m_id,
        });

        await this.dbMerchantService.create({
            m_id,
            phone,
            auth: auth._id,
            reputation: reputation._id,
            report: localeReport._id,
            device: device._id,
            wallet: wallet._id,
            promotion: promotion._id,
            certification: certification._id,
            wechat: wechat._id,
            alipay: alipay._id,
        });

        this.createSignSmsData(phone, code, m_id);
    }

    async createSignSmsData(phone, code, m_id?) {
        const sms = await this.dbMerchantSmsService.find({
            phone,
            type: 'registry',
        });

        if (sms) {
            await this.dbMerchantSmsService.update({
                phone,
                type: 'registry',
                code,
            });

            return;
        }

        await this.dbMerchantSmsService.create({
            m_id,
            phone,
            type: 'registry',
            code,
        });
    }

    async submitAuditMerchant(body) {
        const { password, area, name, phone, code } = body;
        if (!password || !area || !name || !phone || !code) {
            return SendBadRequest('商家数据有误', 400);
        }

        const sms = await this.dbMerchantSmsService.find({
            phone,
            type: 'registry',
            code,
        });

        if (!sms) {
            return SendBadRequest('验证码有误', 400);
        }

        const m_id = await this.dbMerchantService.findAll(phone);
        if (!m_id) {
            return SendBadRequest('暂未查到商户信息', 400);
        }

        this.dbMerchantService.updateAudit(m_id, {
            password: encryptPassword(password),
            area,
            m_name: name,
            status: 1,
        });
    }
}
