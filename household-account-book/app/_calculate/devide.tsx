import { TableRecord, Cycle } from "../_storage/handler";

type DisplayField = {
    id: string;
    title: string;
    amount: number;
    createdAt: Date;
}
type CalculateCase = (record : TableRecord) => DisplayField;

function calculateDisplayField(
    dataTable : TableRecord[], 
    whenDaily : CalculateCase,
    whenWeekly : CalculateCase,
    whenMonthly : CalculateCase,
    whenYearly : CalculateCase
) : DisplayField[] {

    if (!dataTable) return [];

    return dataTable.map((record) => {
        switch (record.cycle) {
            case Cycle.Daily:
                return whenDaily(record);
            case Cycle.Weekly:
                return whenWeekly(record);
            case Cycle.Monthly:
                return whenMonthly(record);
            case Cycle.Yearly:
                return whenYearly(record);
            default:
                throw new Error(`Unknown cycle: ${record.cycle}`);
        }
    });
}

export default calculateDisplayField;
export type { DisplayField };