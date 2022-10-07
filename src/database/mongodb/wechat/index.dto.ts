export class CreateWechat {
    u_id: number;
    wechats?: [];
}

export class FindWechat {
    u_id: number;
}

export class AddWechat {
    u_id: number;
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
