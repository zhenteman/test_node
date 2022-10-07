import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
moment.suppressDeprecationWarnings = true;

const format = (time, isMute?) => {
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const startBefore = new Date(before).setHours(0, 0, 0, 0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const endBefore = new Date(before).setHours(23, 59, 59, 59);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const stratTomorrow = new Date(tomorrow).setHours(7, 0, 0, 0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const endTomorrow = new Date(tomorrow).setHours(19, 0, 0, 0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const afterStartTomorrow = new Date(afterTomorrow).setHours(7, 0, 0, 0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const afterEndTomorrow = new Date(afterTomorrow).setHours(19, 0, 0, 0);

    const year = moment(time).isSame(moment(Date.now()), 'y');
    const day = moment(time).isSame(moment(Date.now()), 'd');

    const dayTime = moment(time).format(isMute ? 'HH:mm' : 'HH');
    const monthTime = moment(time).format(isMute ? 'MM-DD HH:mm' : 'MM-DD HH');
    const yearTime = moment(time).format(
        isMute ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD HH',
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
            return `今天 ${dayTime}`;
        }

        return monthTime;
    }

    return yearTime;
};

export default format;
