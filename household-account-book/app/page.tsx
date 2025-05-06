'use client';

import { JSX, useState } from 'react';

export type Tab = {
  id: string;
  label: string;
  content: JSX.Element | string;
  onActivate?: () => void;
};
  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
