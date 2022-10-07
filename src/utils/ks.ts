import { phone } from 'phone';
import * as crypto from 'crypto';
import random from 'string-random';
import axios from 'axios';
import * as ks from '../config/ks.config';
import { encode } from 'querystring';

const sortCodeSign = () => {
    let keys = Object.keys(ks.config);
    keys = keys.sort();
    const ksMap = {};
    keys.forEach((key) => {
        if (key === 'Timestamp') {
            ksMap[key] = new Date().toISOString().split('.')[0] + 'Z';
        } else {
            ksMap[key] = ks.config[key];
        }
    });

    return ksMap;
};

const createSign = (phone, code) => {
    const map = sortCodeSign();
    map['Mobile'] = phone;
    map['TplParams'] = JSON.stringify({
        code,
    });

    const str = Object.keys(map).reduce((total, key, index) => {
        return `${total}${key}=${encodeURIComponent(map[key])}${
            index === Object.keys(map).length - 1 ? '' : '&'
        }`;
    }, '');

    const Signature = crypto
        .createHmac('sha256', ks.sk)
        .update(str)
        .digest('hex');
    map['Signature'] = Signature;

    return map;
};

const sendCode = async (phoneNumber): Promise<string> => {
    const { isValid } = phone(phoneNumber, {
        country: 'CN',
    });

    if (!isValid) {
        return;
    }

    const code = random(6, { letters: false });

    // try {
    //     const data = createSign(phoneNumber, code);
    //     await axios.post(ks.url, encode(data));
    // } catch (e) {
    //     //
    // }

    return code;
};

export default {
    sendCode,
};
