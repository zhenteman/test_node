import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

export const generateToken = (data): string => {
    try {
        const id = data.m_id || data.u_id;
        if (!data || !id || !data.id) {
            return '';
        }

        const cert = fs.readFileSync('./src/assets/pem/token_private.pem');
        const custom = `${id}/jq_2022Up+${data.id}`;

        const token = jwt.sign(
            {
                data: custom,
            },
            cert,
            {
                algorithm: 'RS256',
            },
        );

        return token;
    } catch (e) {
        return '';
    }
};

interface token {
    id: string | number;
    _id: string;
}

export const verifyToken = (data): boolean | token => {
    try {
        if (!data) {
            return false;
        }

        const cert = fs.readFileSync('./src/assets/pem/token_public.pem');
        const res = jwt.verify(data, cert, { algorithms: ['RS256'] });
        if (!res || !res.data) {
            return false;
        }

        const cut = res.data.split('/jq_2022Up+');
        if (cut.length < 2) {
            return false;
        }

        return {
            id: cut[0],
            _id: cut[1],
        };
    } catch (e) {
        return false;
    }
};
