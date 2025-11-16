'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function StorageInitializer({ children }: { children: React.ReactNode }) {
  const { initialized, initializeFromStorage } = useStore();

  useEffect(() => {
    if (!initialized) {
      initializeFromStorage();
    }
  }, [initialized, initializeFromStorage]);

  return <>{children}</>;
}
