export const connectOptions = [
    {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0,
    },
];

export const geo = {
    nsid: 'need_start',
    neid: 'need_end',
    csid: 'can_start',
    ceid: 'can_end',
    unit: 'km',
    distance: 1.5,
    back: ['WITHDIST', 'WITHCOORD'],
    sort: 'ASC',
    locale_sid: 'report_start',
    locale_eid: 'report_end',
};
