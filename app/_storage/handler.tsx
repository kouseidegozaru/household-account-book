import { useTableStorage } from "./module";
import { useState , useEffect } from "react";

enum Cycle {
    Daily="Daily",
    Weekly="Weekly",
    Monthly="Monthly",
    Yearly="Yearly",
}

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
    const [tableData, setTableData] = useState<TableRecord[]>([]);

    useEffect(() => {
        load();
    }, []);

    function load() {
        const rawData = get() || [];
        const parsedData: TableRecord[] = rawData.map(record => ({
            ...record,
            createdAt: new Date(record.createdAt),
        }));
        setTableData(parsedData);
        console.log(tableData);
    }

    function apply(table: TableRecord[]) {
        setTableData(table);
        set(table);
    }

    function reload() {
        load();
    }

    function addRecord(record: TableRecord) {
        apply([...(tableData || []), record]);
    }

    function removeRecord(id: string) {
        apply((tableData || []).filter(record => record.id !== id));
    }

    function updateRecord(record: TableRecord) {
        apply((tableData || []).map(r => r.id === record.id ? record : r));
    }

    return { reload, tableData, addRecord, removeRecord, updateRecord };
}

export { useStorage, Cycle };
export type { TableRecord };