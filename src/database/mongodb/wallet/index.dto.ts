export class CreateWallet {
    u_id: number;
}

export class FindWallet {
    u_id: number;
}

export class UpdateWallet {
    u_id: number;
    balance?: number;
    status?: number;
}
