type Cycle = 'daily' | 'weekly' | 'monthly' | 'yearly';

type TableRecord = {
    id: string;
    title: string;
    cycleNumber: number;
    cycle: Cycle;
    amount: number;
    createdAt: Date;
}


type TableStorage = TableRecord[] | null;
