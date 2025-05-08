'use client'

import { useState, useEffect } from "react"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DisplayField } from "../_calculate/devide";
import { Cycle } from "../_storage/handler";
import { useStorage } from "../_storage/handler"
import asMonthly from "../_calculate/asMonthly"

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function MonthlyContent() {
    const [displayTable, setDisplayTable] = useState<DisplayField[]>([])
    const { tableData } = useStorage()

    useEffect(() => {

        //表示用のテーブルを作成
        const displayTable = asMonthly(tableData)
        displayTable.sort((a, b) =>  b.createdAt.getTime() - a.createdAt.getTime())
        setDisplayTable(displayTable)

    }, [tableData])

    // 日毎
    const getDailyItems = (displayTable : DisplayField[]) => displayTable.filter((record) => record.cycle === Cycle.Daily)
    // 週毎
    const getWeeklyItems = (displayTable : DisplayField[]) => displayTable.filter((record) => record.cycle === Cycle.Weekly)
    // 月毎
    const getMonthlyItems = (displayTable : DisplayField[]) => displayTable.filter((record) => record.cycle === Cycle.Monthly)
    // 年毎
    const getYearlyItems = (displayTable : DisplayField[]) => displayTable.filter((record) => record.cycle === Cycle.Yearly)

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

                <div className="border-y border-y-border-default mx-9 text-center mt-4"> 
                    <p className="font-bold text-text-primary text-sm mt-4">合計</p>
                    <p className="text-3xl font-bold">¥{amountTotal(displayTable).toLocaleString()}</p>
                    <p className="text-sm mb-4 mt-1 text-text-primary">{new Date().getFullYear()}年 {new Date().getMonth() + 1}月</p>
                </div>

                <div className="mx-9 mt-4 mb-4 flex justify-center items-center">
                    <Pie
                        data={{
                            labels: ['日毎', '週毎', '月毎', '年毎'],
                            datasets: [
                                {
                                    label: 'Cycle',
                                    data: [
                                        amountTotal(getDailyItems(displayTable)),
                                        amountTotal(getWeeklyItems(displayTable)),
                                        amountTotal(getMonthlyItems(displayTable)),
                                        amountTotal(getYearlyItems(displayTable))
                                    ],
                                    backgroundColor: ['#004F46', '#047C72', '#4BACA0', '#7FDED1'],
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Cycle',
                                },
                                datalabels: {
                                    color: '#fff',
                                    formatter: (value, context) => { return '¥' + value.toLocaleString() },
                                },
                            },
                        }}
                    />
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