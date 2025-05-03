'use client'

import { useState, useEffect } from "react"
import { DisplayField } from "../_calculate/devide";
import { useStorage } from "../_storage/handler"
import asMonthly from "../_calculate/asMonthly"

export default function MonthlyContent() {
    const [displayTable, setDisplayTable] = useState<DisplayField[]>([])
    const { tableData } = useStorage()

    useEffect(() => {
        const displayTable = asMonthly(tableData)
        displayTable.sort((a, b) =>  b.createdAt.getTime() - a.createdAt.getTime())
        setDisplayTable(displayTable)
    }, [tableData])

    return(
        <div>
            <div>
                {Math.ceil(displayTable.reduce((acc, record) => {
                    return acc + record.amount
                }, 0))}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {displayTable.map((record) => (
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