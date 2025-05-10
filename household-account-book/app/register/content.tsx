'use client';

import { useState, useEffect } from 'react';
import { useStorage, Cycle } from '../_storage/handler';
import { TableRecord } from '../_storage/handler';

export default function RegisterContent() {
    const [ displayData, setDisplayData ] = useState<TableRecord[]>([]);
    const { tableData } = useStorage();

    useEffect(() => {
        setDisplayData(tableData);
    }, [tableData]);

    return (
        <div>
            {displayData.map((item, index) => (
                <p key={index}>{item.title}</p>
            ))}
        </div>
    )
}