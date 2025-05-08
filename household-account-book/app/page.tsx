'use client';

import { JSX, useState } from 'react';

export type Tab = {
  id: string;
  label: JSX.Element | string;
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
    <div className="w-full h-full bg-bg-default">

      <header className="w-full h-auto sticky top-0 bg-bg-primary border-b border-b-border-default">
        <div className="pt-3 pb-1 pl-2">
          <p className='text-sm font-bold text-text-default'>Calculate expenses</p>
          <p className="text-2xl font-bold text-secondary">出費予定計算</p>
        </div>
      </header>

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

      <footer className="w-full fixed bottom-0 bg-bg-primary border-t border-t-border-default">
        <div className="w-full justify-around flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`hover:bg-hover-bg font-bold ml-4 my-3 px-4 py-1 rounded-lg text-sm ${
                activeTab.id === tab.id
                  ? 'text-hover-text'
                  : 'text-text-primary '
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </footer>

    </div>
  );
}
