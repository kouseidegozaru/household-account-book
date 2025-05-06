'use client';

import { JSX, useState } from 'react';

export type Tab = {
  id: string;
  label: string;
  content: JSX.Element | string;
  onActivate?: () => void;
};

const tabs: Tab[] = [
  {id: 'tab1', 
    label: 'タブ1', 
    content: 'タブ1の内容',
    onActivate: () => {console.log('タブ1がアクティブになりました');}
  },
  { 
    id: 'tab2', 
    label: 'タブ2', 
    content: 'タブ2の内容',
    onActivate: () => {console.log('タブ2がアクティブになりました');}
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
    <div className="w-full h-auto bg-background">
      <div className="w-full mt-4 ml-2">
        <p className='text-sm font-bold text-primary'>Calculate expenses</p>
        <h1 className="text-3xl font-bold text-secondary">出費予定計算</h1>
      </div>
      <div className="flex mt-4 mx-4 bg-tertiary rounded-lg overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`text-secondary font-bold ml-4 my-3 px-4 py-1 rounded-lg text-sm font-medium ${
              activeTab.id === tab.id
                ? 'bg-base'
                : 'hover:text-base'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full overflow-y-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab.id === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
