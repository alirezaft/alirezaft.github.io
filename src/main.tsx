import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AudioProvider } from './audio';
import { UIProvider } from './context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </AudioProvider>
  </StrictMode>,
);

