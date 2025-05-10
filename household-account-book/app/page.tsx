'use client';

import { JSX, useState } from 'react';
import Image from 'next/image';
import MonthlyContent from './monthly/content';
import RegisterContent from './register/content';

export type Tab = {
  id: string;
  label: JSX.Element | string;
  content: JSX.Element | string;
  onActivate?: () => void;
};

const tabs: Tab[] = [
  {
    id: 'monthly', 
    label: <Image src="/calendar.svg" alt="Monthly" width={20} height={20}/>, 
    content: <MonthlyContent />,
    onActivate: () => {}
  },
  { 
    id: 'edit', 
    label: <Image src="/edit.svg" alt="Edit" width={20} height={20}/>, 
    content: <RegisterContent />,
    onActivate: () => {}
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // タブのクリックイベント
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    if (tab.onActivate) {
      tab.onActivate();
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-bg-default">

      <header className="w-full h-auto sticky top-0 bg-bg-primary border-b border-b-border-default">
        <div className="pt-3 pb-1 pl-2 flex">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={30}
            height={30}
            className="rounded-full fill-primary mr-1"
          />
          <p className="text-1xl font-bold">CalculateExpenses</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-16">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab.id === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </main>

      <footer className="w-full fixed bottom-0 bg-bg-primary border-t border-t-border-default">
        <div className="w-full justify-around flex">
          {tabs.map((tab) => (
            <div className={`flex items-center justify-center ${activeTab.id === tab.id ? 'border-b-3 border-b-primary' : ''}`} key={tab.id}>
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`hover:bg-hover-bg text-text-primary font-bold my-2 px-4 py-1 rounded-lg text-sm}`}>
                {tab.label}
              </button>
            </div>
          ))}
        </div>
      </footer>

    </div>
  );
}
