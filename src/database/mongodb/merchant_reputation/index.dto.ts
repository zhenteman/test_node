export class CreateReputation {
    m_id: string;
    order?: number;
    praise?: number;
    star?: number;
    report?: number;
    be_report?: number;
    evaluate?: number;
    be_evaluate?: number;
}

export class FindReputation {
    m_id: string;
}

export class UpdateReputation {
    m_id: string;
    order?: number;
    praise?: number;
    star?: number;
    report?: number;
    be_report?: number;
    evaluate?: number;
    be_evaluate?: number;
}
