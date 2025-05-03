import { DisplayField } from "./types";
import { TableRecord } from "../_storage/handler";

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
            case 'daily':
                return whenDaily(record);
            case 'weekly':
                return whenWeekly(record);
            case 'monthly':
                return whenMonthly(record);
            case 'yearly':
                return whenYearly(record);
            default:
                throw new Error(`Unknown cycle: ${record.cycle}`);
        }
    });
}

export default calculateDisplayField;