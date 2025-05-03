'use client'

import { useState, useEffect } from "react"
import { DisplayField } from "../_calculate/devide";
import { Cycle } from "../_storage/handler";
import { useStorage } from "../_storage/handler"
import asMonthly from "../_calculate/asMonthly"

export default function MonthlyContent() {
    const [displayTable, setDisplayTable] = useState<DisplayField[]>([])
    const { tableData } = useStorage()

    useEffect(() => {

        //表示用のテーブルを作成
        const displayTable = asMonthly(tableData)
        displayTable.sort((a, b) =>  b.createdAt.getTime() - a.createdAt.getTime())
        setDisplayTable(displayTable)

    }, [tableData])

    // 支出として扱うもの
    const getExpensesItems = (displayTable : DisplayField[]) => displayTable.filter((record) => record.cycle !== Cycle.Yearly)

    // 積み立てとして扱うもの
    const getSavingsItems = (displayTable : DisplayField[]) => displayTable.filter((record) => record.cycle === Cycle.Yearly)

    // 金額合計
    const amountTotal = (table : DisplayField[]) : number => {
        const total = table.reduce((acc, record) => {
            return acc + record.amount
        }, 0)
        return Math.ceil(total)
    }

    return(
        <div>
            <div>
                {amountTotal(displayTable)}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <p>支出</p>
                            <hr />
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    {getExpensesItems(displayTable).map((record) => (
                        <tr key={record.id}>
                            <td>{record.title}</td>
                            <td>{Math.ceil(record.amount)}</td>
                        </tr>
                    ))}
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <p>積み立て</p>
                            <hr />
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    {getSavingsItems(displayTable).map((record) => (
                        <tr key={record.id}>
                            <td>{record.title}</td>
                            <td>{Math.ceil(record.amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}