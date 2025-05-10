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
    const [ animatedTotal, setAnimatedTotal ] = useState<number>(0)
    const { tableData, reload } = useStorage()

    //合計をカウントアップ
    const countUpTotal = () => {
        // 合計値をカウントアップ
        const total = amountTotal(displayTable);
        let start = 0;
        const duration = 700; // 0.7秒
        const increment = total / (duration / 16); // 16msごとに増加

        const animate = () => {
            start += increment;
            if (start >= total) {
                setAnimatedTotal(total); // 最終値を設定
            } else {
                setAnimatedTotal(Math.ceil(start));
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    useEffect(() => {

        //表示用のテーブルを作成
        const displayTable = asMonthly(tableData)
        displayTable.sort((a, b) =>  b.createdAt.getTime() - a.createdAt.getTime())
        setDisplayTable(displayTable)

    }, [tableData])

    useEffect(() => {
        // カウントアップアニメーションを開始
        countUpTotal()
    },[displayTable])


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

    const content = (
        <div>

                <div className="border-y border-y-border-default mx-9 text-center mt-4"> 
                    <p className="font-bold text-text-primary text-sm mt-4">合計</p>
                    <p className="text-3xl font-bold">¥{animatedTotal.toLocaleString()}</p>
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
                                    formatter: (value : number) => { return '¥' + value.toLocaleString() },
                                },
                            },
                            animation: {
                                duration: 700,
                            }
                        }}
                    />
                </div>

                <div className=" mt-5 w-full">
                    <div className="flex justify-between mx-3 border-b border-b-border-default">
                        <p className="text-text-default font-bold text-sm">支出予定</p>
                        <p className="text-text-default font-bold text-sm mr-2">¥{amountTotal(getExpensesItems(displayTable)).toLocaleString()}</p>
                    </div>
                    {getExpensesItems(displayTable).map((record) => (
                        <div key={record.id} className="flex justify-between items-center ml-4 mr-5 mt-2 mb-2">
                            <p className="text-text-primary">{record.title}</p>
                            <p className="text-text-primary">¥{Math.ceil(record.amount).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className=" mt-7 w-full">
                    <div className="flex justify-between mx-3 border-b border-b-border-default">
                        <p className="text-text-default font-bold text-sm">積立予定</p>
                        <p className="text-text-default font-bold text-sm mr-2">¥{amountTotal(getSavingsItems(displayTable)).toLocaleString()}</p>
                    </div>
                    {getSavingsItems(displayTable).map((record) => (
                        <div key={record.id} className="flex justify-between items-center ml-4 mr-5 mt-2 mb-2">
                            <p className="text-text-primary">{record.title}</p>
                            <p className="text-text-primary">¥{Math.ceil(record.amount).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

        </div>
    );

    return { content, reload};
}