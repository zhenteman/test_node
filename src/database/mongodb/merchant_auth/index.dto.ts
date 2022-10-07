export interface auth {
    score?: string;
    name: number;
    idcard: string;
    image_id?: string;
    order_no?: string;
    req_id?: string;
}

export class CreateAuth {
    m_id: string;
    data?: [auth];
    auth?: number;
}

export class FindAuth {
    m_id: string;
    auth?: number;
}

export class addAuth {
    data: auth;
    m_id: string;
    auth: number;
}
