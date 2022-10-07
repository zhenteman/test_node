export class CreateWallet {
    m_id: string;
}

export class FindWallet {
    m_id: string;
}

export class UpdateWallet {
    m_id: string;
    balance?: number;
    status?: number;
}
