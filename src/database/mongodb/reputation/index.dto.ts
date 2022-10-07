export class CreateReputation {
    u_id: number;
    order?: number;
    praise?: number;
    star?: number;
    report?: number;
    be_report?: number;
    evaluate?: number;
    be_evaluate?: number;
}

export class FindReputation {
    u_id: number;
}

export class UpdateReputation {
    u_id: number;
    order?: number;
    praise?: number;
    star?: number;
    report?: number;
    be_report?: number;
    evaluate?: number;
    be_evaluate?: number;
}
