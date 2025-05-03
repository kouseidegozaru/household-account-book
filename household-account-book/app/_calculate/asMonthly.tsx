import calculateDisplayField from "./devide";
import { DisplayField } from "./devide";
import { TableRecord } from "../_storage/handler";

function asMonthly(dataTable: TableRecord[]): DisplayField[] {
    // 今月の日数を計算
    const now = new Date();
    const thisMonthDaysCount = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    function recordToDisplayField(record: TableRecord, amount: number): DisplayField {
        return {
            id: record.id,
            title: record.title,
            amount: amount,
            createdAt: record.createdAt,
        };
    }

    return calculateDisplayField(
        dataTable,
        (record) => recordToDisplayField(record, record.amount * (thisMonthDaysCount / record.cycleNumber)),
        (record) => recordToDisplayField(record, record.amount * (thisMonthDaysCount / (record.cycleNumber * 7))),
        (record) => recordToDisplayField(record, record.amount / record.cycleNumber),
        (record) => recordToDisplayField(record, record.amount / (record.cycleNumber * 12))
    );
}

export default asMonthly;