export class CreateAlipay {
    m_id: string;
    alipays?: [];
}

export class FindAlipay {
    m_id: string;
}

export class AddAlipay {
    m_id: string;
    type: number;
    code: string;
    access_token: string;
    refresh_token: string;
    user_id: string;
    union_id: string;
    nickname: string;
    sex: number;
    province: string;
    city: string;
    country: string;
    avatar: string;
}
