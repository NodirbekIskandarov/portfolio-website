'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { LanguageProvider } from '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LanguageProvider>{children}</LanguageProvider>
    </Provider>
  );
}
