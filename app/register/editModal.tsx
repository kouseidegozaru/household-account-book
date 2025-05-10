import React, { useState } from 'react';
import { Cycle } from '../_storage/handler';
import { TableRecord } from '../_storage/handler';

interface EditModalProps {
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    updateRecord: (record: TableRecord) => void;
    record: TableRecord;
}

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
}

const EditModal: React.FC<EditModalProps> = ({ setShowEditModal, updateRecord, record }) => {

    const [title, setTitle] = useState(record.title);
    const [amount, setAmount] = useState(record.amount.toString());
    const [cycle, setCycle] = useState<Cycle>(record.cycle);
    const [cycleNumber, setCycleNumber] = useState(record.cycleNumber.toString());
    const [errors, setErrors] = useState<{ title?: string; amount?: string; cycleNumber?: string }>({});

    const validate = () => {
        const newErrors: { title?: string; amount?: string; cycleNumber?: string } = {};

        if (!title.trim()) newErrors.title = '出費名を入力してください。';
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) newErrors.amount = '正しい出費額を入力してください。';
        if (!cycleNumber || isNaN(Number(cycleNumber)) || Number(cycleNumber) <= 0) newErrors.cycleNumber = '正しいサイクル数を入力してください。';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        updateRecord({
            id: record.id,
            title,
            cycleNumber: Number(cycleNumber),
            cycle,
            amount: Number(amount),
            createdAt: new Date(),
        });
        setShowEditModal(false);
    };

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-text-primary/70 flex justify-center items-center z-10 p-8'>
            <div className='w-full h-auto bg-bg-default rounded-lg overflow-y-auto'>
                <div className='flex justify-between items-center border-b border-b-border-default'>
                    <p className="text-sm text-text-primary font-bold ml-4">追加</p>
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="text-4xl font-bold text-text-primary mr-4 mb-2">
                        ×
                    </button>
                </div>

                <div className='m-5'>
                    <p className="ml-2 mt-4 text-sm text-text-primary">出費名</p>
                    <input
                        value={title}
                        placeholder='出費名を入力してください。'
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full h-10 border ${errors.title ? 'border-red-500' : 'border-border-default'} rounded-lg mt-1 px-2 mb-1`}
                    />
                    {errors.title && <p className='text-red-500 text-xs'>{errors.title}</p>}

                    <p className="ml-2 mt-4 text-sm text-text-primary">出費額</p>
                    <input
                        value={amount}
                        placeholder='出費額を入力してください。'
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full h-10 border ${errors.amount ? 'border-red-500' : 'border-border-default'} rounded-lg mt-1 px-2 mb-1`}
                    />
                    {errors.amount && <p className='text-red-500 text-xs'>{errors.amount}</p>}

                    <p className="ml-2 mt-4 text-sm text-text-primary">サイクル</p>
                    <div className="flex gap-2">
                        <input
                            value={cycleNumber}
                            placeholder='サイクル数を入力してください。'
                            onChange={(e) => setCycleNumber(e.target.value)}
                            className={`w-full h-10 border ${errors.cycleNumber ? 'border-red-500' : 'border-border-default'} rounded-lg mt-1 px-2 mb-1`}
                        />
                        <select
                            value={cycle}
                            onChange={(e) => setCycle(e.target.value as Cycle)}
                            className={`w-full h-10 border border-border-default rounded-lg mt-1 px-2 mb-1`}
                            aria-label="サイクル選択"
                        >
                            {Object.values(Cycle).map((cycle) => (
                                <option key={cycle} value={cycle}>
                                    {cycleToDisplay(cycle)}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.cycleNumber && <p className='text-red-500 text-xs'>{errors.cycleNumber}</p>}

                    <button
                        className={`w-full h-10 bg-primary text-white rounded-lg mt-4`}
                        onClick={handleSubmit}
                    >
                        更新
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
