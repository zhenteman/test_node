export interface auth {
    score?: string;
    name: number;
    idcard: string;
    image_id?: string;
    order_no?: string;
    req_id?: string;
}

export class CreateAuth {
    u_id: number;
    data?: [auth];
    auth?: number;
}

export class FindAuth {
    u_id: number;
    auth?: number;
}

export class addAuth {
    data: auth;
    u_id: number;
    auth: number;
}
