import { phone } from 'phone';
import isImage from 'is-image';
import * as crypto from 'crypto';
import SALT from 'src/config/salt.config.';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xss = require('xss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

export const isGeo = (lon, lat) => {
    //经度，整数部分为0-180小数部分为0到6位
    const longreg =
        /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
    if (!longreg.test(lon)) {
        return false;
    }

    //纬度,整数部分为0-90小数部分为0到6位
    const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
    if (!latreg.test(lat)) {
        return false;
    }

    return true;
};

export const isPhoneNumber = (phoneNumber): boolean => {
    const { isValid } = phone(phoneNumber, {
        country: 'CN',
    });

    return isValid;
};

export const encryptPassword = (password): string => {
    const sha1 = crypto.createHash('sha1');
    return sha1.update(`${password}${SALT}`).digest('hex');
};

export const max11len = (str): boolean => {
    return str?.length < 11;
};

export const isImages = (url): boolean => {
    return isImage(url);
};

export const xssContent = (content): string => {
    return xss(content);
};

export const formatTime = (time, isMute?) => {
    if (!time) {
        return;
    }

    time = +time;

    if (isNaN(time)) {
        return;
    }
    time = new Date(time);

    const invalid = moment(time, 'YYYY-MM-DD HH:mm:ss').format();
    if (invalid === 'Invalid date') {
        return;
    }

    const before = moment().add(-1, 'days');
    const tomorrow = moment().add(1, 'days');
    const afterTomorrow = moment().add(2, 'days');

    const startBefore = new Date(before).setHours(0, 0, 0, 0);
    const endBefore = new Date(before).setHours(23, 59, 59, 59);
    const stratTomorrow = new Date(tomorrow).setHours(7, 0, 0, 0);
    const endTomorrow = new Date(tomorrow).setHours(19, 0, 0, 0);
    const afterStartTomorrow = new Date(afterTomorrow).setHours(7, 0, 0, 0);
    const afterEndTomorrow = new Date(afterTomorrow).setHours(19, 0, 0, 0);

    const year = moment(time).isSame(moment(Date.now()), 'y');
    const day = moment(time).isSame(moment(Date.now()), 'd');

    const dayTime = moment(time).format(!isMute ? 'HH:mm' : 'HH');
    const monthTime = moment(time).format(!isMute ? 'MM-DD HH:mm' : 'MM-DD HH');
    const yearTime = moment(time).format(
        !isMute ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD HH',
    );

    if (year) {
        if (+time >= startBefore && +time <= endBefore) {
            return `昨天 ${dayTime}`;
        }
        if (+time >= +stratTomorrow && +time <= +endTomorrow) {
            return `明天 ${dayTime}`;
        }

        if (+time >= +afterStartTomorrow && +time <= afterEndTomorrow) {
            return `后天 ${dayTime}`;
        }

        if (day) {
            if (!isMute) {
                return dayTime;
            }

            const date1 = moment(time, 'HH:mm');
            const date2 = moment(new Date(), 'HH:mm');
            const date3 = date2.diff(date1, 'minute');
            const diffHour = Math.ceil(date3 / 60);

            if (date3 === 0) {
                return '1分钟前';
            }

            if (date3 <= 45) {
                return `${date3}分钟前`;
            }

            if (date3 > 45 && diffHour < 5) {
                return `${diffHour}小时前`;
            }

            return `今天 ${dayTime}`;
        }

        return monthTime;
    }

    return yearTime;
};

export const reputedUser = (user) => {
    const skills = user?.skills || {};
    let skill = skills['skills'] || [];
    skill = skill.map((item: { label: any; name: any }) => ({
        label: item.label,
        name: item.name,
    }));

    const auth = user?.auth || {};
    const authStatus = auth['auth'];

    const devices = user?.device || {};
    let device = devices['devices'] || [];
    device = device.map(
        (item: {
            system: string;
            name: string;
            status: number;
            created_time: Date;
        }) => ({
            name: item.name,
            system: item.system,
            status: item.status,
            time: formatTime(item.created_time),
        }),
    );

    const shops = user?.shop || {};
    let shop = shops['shops'] || [];
    shop = shop.map(
        (item: {
            remark: string;
            name: string;
            nature: number;
            type: number;
            status: number;
            material: [];
        }) => ({
            name: item.name,
            remark: item.remark,
            nature: item.nature,
            type: item.type,
            status: item.status,
            material: item.material,
        }),
    );

    const strokes = user?.stroke || {};
    let stroke = strokes['strokes'] || [];
    stroke = stroke.map(
        (item: {
            lat: string;
            lon: string;
            title: string;
            address: string;
        }) => ({
            lat: item.lat,
            lon: item.lon,
            title: item.title,
            address: item.address,
        }),
    );

    const professions = user?.profession || {};
    let profession = professions['professions'] || [];
    profession = profession.map(
        (item: { name: string; seniority: number }) => ({
            name: item.name,
            seniority: item.seniority,
        }),
    );

    const wechats = user?.wechat || {};
    let wechat = wechats['wechats'] || [];
    wechat = wechat.filter((item) => item.type === 1);
    [wechat] = wechat.slice(-1);

    const alipays = user?.alipay || {};
    let alipay = alipays['alipays'] || [];
    alipay = alipay.filter((item) => item.type === 1);
    [alipay] = alipay.slice(-1);

    return {
        ...user['_doc'],
        skills: skill,
        auth: authStatus,
        device,
        shop,
        stroke,
        profession,
        wechat: wechat || {},
        alipay: alipay || {},
    };
};
