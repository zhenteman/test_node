import * as Jpush from 'jpush-async';
import axios from 'axios';
import config from 'src/config/jpush.config';

const { JPushAsync } = Jpush;
const client = JPushAsync.buildClient(config);

const baseAuth = () => {
    const base64 = Buffer.from(
        `${config.appKey}:${config.masterSecret}`,
    ).toString('base64');
    return `Basic ${base64}`;
};

export const JpushBaseAuth = () => {
    const base64 = Buffer.from(
        `${config.appKey}:${config.masterSecret}`,
    ).toString('base64');

    return {
        headers: {
            Authorization: `Basic ${base64}`,
        },
    };
};

const setJpushOptions = (data, registrys) => {
    if (!data || !registrys || !registrys.length) {
        return;
    }

    return {
        ios: {
            alert: data.alert,
            title: data.title,
            sound: data.sound || 'sound',
            badge: data.badge || 1,
            contentAvailable: data.contentAvailable || true,
            extras: data.extras,
            category: data.category,
            mutableContent: data.mutableContent || true,
        },
        android: {
            alert: data.alert,
            title: data.title,
            builder_id: data.builder_id || 1,
            extras: data.extras,
            priority: data.priority || 1,
            category: data.category,
            style: data.style,
            value: data.value,
            alertTYpe: data.alertTYpe,
        },
        winphone: {
            alert: data.alert,
            title: data.title,
            openPage: data.openPage,
            extras: data.extras,
        },
        registrys,
    };
};

const sendJpush = async (data) => {
    try {
        if (!data) {
            return;
        }

        const { ios, android, winphone, registrys } = data;

        if (!ios || !android || !winphone || !registrys) {
            return;
        }

        return await client
            .push()
            .setPlatform(JPushAsync.ALL)
            .setAudience(JPushAsync.registration_id(registrys))
            .setNotification(
                JPushAsync.android(
                    android.alert,
                    android.title,
                    android.builder_id || 1,
                    android.extras,
                    android.priority,
                    android.category,
                    android.style,
                    android.value,
                    android.alertTYpe || -1,
                ),
                JPushAsync.ios(
                    ios.alert,
                    ios.sound,
                    ios.badge || 1,
                    ios.contentAvailable,
                    ios.extras,
                    ios.category,
                    ios.mutableContent,
                ),
                JPushAsync.winphone(
                    winphone.alert,
                    winphone.title,
                    winphone.openPage,
                    winphone.extras,
                ),
            )
            // .setMessage(ios.alert, ios.title, ios.extras)
            .send();
    } catch (e) {
        return;
    }
};

const postNearbyOrder = async (ids, data = {}) => {
    const posePost = ids.map(async (item) => {
        await axios.post(
            `${config.imUrl}/v1/messages`,
            {
                version: 1,
                target_type: data['target_type'] || 'single',
                target_id: item,
                target_name: '附近新订单',
                from_type: data['from_type'] || 'admin',
                from_id: data['from_id'] || 'shoudeng_order',
                notification: data['notification'],
                msg_type: data['msg_type'] || 'text',
                msg_body: data['msg_body'] || {},
            },
            {
                headers: {
                    Authorization: baseAuth(),
                },
            },
        );
    });

    await Promise.allSettled(posePost);
};

const postSystemNotify = async (ids, data = {}) => {
    const posePost = ids.map(async (item) => {
        await axios.post(
            `${config.imUrl}/v1/messages`,
            {
                version: 1,
                target_type: data['target_type'] || 'single',
                target_id: item,
                target_name: '通知',
                from_type: data['from_type'] || 'admin',
                from_id: data['from_id'] || 'shoudeng_notify',
                notification: data['notification'],
                msg_type: data['msg_type'] || 'text',
                msg_body: data['msg_body'] || {},
            },
            {
                headers: {
                    Authorization: baseAuth(),
                },
            },
        );
    });

    await Promise.allSettled(posePost);
};

const postSystemService = async (ids, data = {}) => {
    const posePost = ids.map(async (item) => {
        await axios.post(
            `${config.imUrl}/v1/messages`,
            {
                version: 1,
                target_type: data['target_type'] || 'single',
                target_id: item,
                target_name: '客服',
                from_type: data['from_type'] || 'admin',
                from_id: data['from_id'] || 'shoudeng_service',
                notification: data['notification'],
                msg_type: data['msg_type'] || 'text',
                msg_body: data['msg_body'] || {},
            },
            {
                headers: {
                    Authorization: baseAuth(),
                },
            },
        );
    });

    await Promise.allSettled(posePost);
};

export const preSendJpush = async (data, ids) => {
    try {
        if (!data || !ids || !ids.length) {
            return;
        }

        const options = setJpushOptions(data, ids);
        const { ios, android, winphone, registrys } = options;

        if (!ios || !android || !winphone || !registrys) {
            return;
        }

        let sliceList = [];

        for (let i = 0; i < registrys.length; i += 1000) {
            sliceList.push(registrys.slice(i, i + 1000));
        }

        sliceList = sliceList.map((jpush) => {
            return sendJpush({
                ios,
                android,
                winphone,
                registrys: jpush,
            });
        });

        return await Promise.allSettled(sliceList);
    } catch (e) {
        return;
    }
};
