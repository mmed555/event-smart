import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import { AIChatProvider } from './context/AIChatContext';
import { I18nProvider } from './i18n';
import './fonts.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AppProvider>
          <AIChatProvider>
            <App />
          </AIChatProvider>
        </AppProvider>
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>
);
