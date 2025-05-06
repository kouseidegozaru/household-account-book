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

  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
