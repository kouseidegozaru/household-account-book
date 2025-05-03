import { useTableStorage } from "./module";
import { useState , useEffect } from "react";

type Cycle = 'daily' | 'weekly' | 'monthly' | 'yearly';

type TableRecord = {
    id: string;
    title: string;
    cycleNumber: number;
    cycle: Cycle;
    amount: number;
    createdAt: Date;
}

function useStorage() {
    const { get, set } = useTableStorage<TableRecord[]>();

    // 取得したデータをTableRecord型に変換
    const rawData = get() || [];
    const parsedData: TableRecord[] = rawData.map(record => ({
        ...record,
        createdAt: new Date(record.createdAt),
    }));

    const [tableData, setTableData] = useState<TableRecord[]>(parsedData);

    useEffect(() => {
        set(tableData);
    }, [tableData]);

    function addRecord(record: TableRecord) {
        setTableData((prev) => [...(prev || []), record]);
    }

    function removeRecord(id: string) {
        setTableData((prev) => (prev || []).filter(record => record.id !== id));
    }

    function updateRecord(record: TableRecord) {
        setTableData((prev) => (prev || []).map(r => r.id === record.id ? record : r));
    }

    return { tableData, addRecord, removeRecord, updateRecord };
}

export { useStorage };
export type { TableRecord, Cycle };