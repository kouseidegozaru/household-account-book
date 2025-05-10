'use client';

import { useState, useEffect } from 'react';
import { useStorage, Cycle } from '../_storage/handler';
import { TableRecord } from '../_storage/handler';
import RegisterModal from './registerModal';

export default function RegisterContent() {
    const [ isShowRegisterModal, setShowRegisterModal ] = useState(false);
    const [ displayData, setDisplayData ] = useState<TableRecord[]>([]);
    const { tableData, addRecord } = useStorage();

    useEffect(() => {
        setDisplayData(tableData);
    }, [tableData]);

    const cycleToDisplay = (cycle: Cycle) => {
        switch (cycle) {
            case Cycle.Daily:
                return '日';
            case Cycle.Weekly:
                return '週間';
            case Cycle.Monthly:
                return 'ヶ月';
            case Cycle.Yearly:
                return '年';
            default:
                return '';
        }
    };

    return (
        <div>
            {isShowRegisterModal && (
                <RegisterModal setShowRegisterModal={setShowRegisterModal} addRecord={addRecord} />
            )}
            <div className="flex justify-between items-center border-b border-b-border-default py-2">
                <p className="text-lg font-bold">出費計画</p>
                <button 
                    onClick={() => { setShowRegisterModal(true) }}
                    className="text-sm bg-hover-text text-bg-default rounded-full px-4 py-1 border border-border-default
                    hover:bg-hover-bg hover:text-hover-text">
                        + Add
                </button>
            </div>
            
            {displayData.map((item, index) => (
                <div key={index} className="flex flex-col border-b border-b-border-default py-2">
                    <div className='flex justify-between items-center'>

                        <div className="flex flex-col space-y-1">
                            <p key={index} className="text-lg font-bold text-text-primary">{item.title}</p>
                            <div className="flex items-center space-x-2 text-sm text-text-secondary">
                                <span className="bg-hover-bg text-text-primary px-2 py-1 rounded">
                                    ¥{item.amount}
                                </span>
                                <span className="text-text-primary">
                                    / {item.cycleNumber}{cycleToDisplay(item.cycle)}
                                </span>
                            </div>
                        </div>

                        <button className="text-sm font-bold text-text-primary mr-4">
                            ・・・
                        </button>

                    </div>
                </div>
            ))}
        </div>
    )
}