export class CreateWechat {
    m_id: string;
    wechats?: [];
}

export class FindWechat {
    m_id: string;
}

export class AddWechat {
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
