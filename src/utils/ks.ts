import { phone } from 'phone';
import random from 'string-random';
import axios from 'axios';

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
