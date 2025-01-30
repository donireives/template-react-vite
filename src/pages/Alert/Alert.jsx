import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useTheme } from '@/hooks/useTheme';

function Alert() {
  const { theme: currentTheme } = useTheme();

  return (
    <MainLayout activePage="alert">
      <div className={`rounded shadow ${currentTheme === 'dark' ? 'bg-darker' : 'bg-white'}`}>
        <div className="p-4">
          <h1>Alert Page</h1>
          {/* Alert content here */}
        </div>
      </div>
    </MainLayout>
  );
}

export default Alert; 