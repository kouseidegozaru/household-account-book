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
    <div className="w-full h-auto">
      <div>
        <h1 className="text-2xl font-bold text-center my-4">出費計算</h1>
        <p className="text-center text-gray-600">定期的な出費を月単位で計算出来ます。</p>
      </div>
      <div className="flex border-b mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab.id === tab.id
                ? 'border-b-2 border-primary text-primary font-bold'
                : 'text-gray-500 hover:text-gray-700'
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
